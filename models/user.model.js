// models/user.model.js - Updated schema for admin-friendly imports
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // Changed to String to handle CALL-131 format
  callUpNumber: {
    type: String,
    required: [true, 'Call-up Number is required'],
    unique: true,
    trim: true,
    uppercase: true, // Automatically converts to uppercase
    validate: {
      validator: function(v) {
        // Allow various formats: CALL-131, 131, etc.
        return /^[A-Z0-9-]+$/.test(v);
      },
      message: 'Call-up Number can only contain letters, numbers, and hyphens'
    }
  },
  
  // Optional ID field for backward compatibility
  id: {
    type: String,
    trim: true,
    sparse: true, // Allows multiple documents to have undefined/null values
  },
  
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
    trim: true,
    minlength: [2, 'Full Name must be at least 2 characters long'],
    maxlength: [200, 'Full Name cannot exceed 200 characters']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  
  elevationYear: {
    type: Number,
    min: [1900, 'Elevation year cannot be before 1900'],
    max: [new Date().getFullYear(), 'Elevation year cannot be in the future'],
    validate: {
      validator: function(v) {
        return v === undefined || (Number.isInteger(v) && v >= 1900 && v <= new Date().getFullYear());
      },
      message: 'Elevation year must be a valid 4-digit year'
    }
  },
  
  debitBalance: {
    type: Number,
    default: 0,
    min: [0, 'Debit balance cannot be negative'],
    validate: {
      validator: function(v) {
        return v === undefined || v >= 0;
      },
      message: 'Debit balance must be a positive number'
    }
  },
  
  activationToken: {
    type: String,
    select: false // Don't include in regular queries for security
  },
  
  activationTokenExpiresAt: {
    type: Date,
    select: false // Don't include in regular queries
  },
  
  isActive: {
    type: Boolean,
    default: false,
    index: true // Add index for faster queries
  },
  
  invitationSent: {
    type: Boolean,
    default: false,
    index: true // Add index for faster queries
  },
  
  lastError: {
    type: String,
    default: "",
    maxlength: [500, 'Error message too long']
  },
  
  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'moderator'],
      message: 'Role must be either user, admin, or moderator'
    },
    default: 'user',
    index: true // Add index for faster role-based queries
  },
  
  // Additional fields for better admin management
  lastLogin: {
    type: Date,
    index: true
  },
  
  loginAttempts: {
    type: Number,
    default: 0,
    max: [10, 'Too many login attempts']
  },
  
  accountLocked: {
    type: Boolean,
    default: false
  },
  
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  }
  
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      // Remove sensitive fields from JSON output
      delete ret.activationToken;
      delete ret.activationTokenExpiresAt;
      return ret;
    }
  },
  toObject: { virtuals: true }
});

// Indexes for better performance
userSchema.index({ callUpNumber: 1 });
userSchema.index({ email: 1 });
userSchema.index({ name: 1 });
userSchema.index({ isActive: 1, role: 1 }); // Compound index for admin queries
userSchema.index({ createdAt: -1 }); // For sorting by creation date

// Virtual for display name
userSchema.virtual('displayName').get(function() {
  return this.fullName || this.name;
});

// Virtual for account status
userSchema.virtual('accountStatus').get(function() {
  if (this.accountLocked) return 'locked';
  if (!this.isActive) return 'inactive';
  return 'active';
});

// Pre-save middleware to ensure data consistency
userSchema.pre('save', function(next) {
  // Ensure callUpNumber is uppercase
  if (this.callUpNumber) {
    this.callUpNumber = this.callUpNumber.toString().toUpperCase().trim();
  }
  
  // Ensure email is lowercase
  if (this.email) {
    this.email = this.email.toString().toLowerCase().trim();
  }
  
  // Reset login attempts if account is being unlocked
  if (this.isModified('accountLocked') && !this.accountLocked) {
    this.loginAttempts = 0;
  }
  
  next();
});

// Static method for admin-friendly user creation
userSchema.statics.createFromImport = function(userData) {
  return new this({
    ...userData,
    callUpNumber: userData.callUpNumber?.toString().toUpperCase().trim(),
    email: userData.email?.toString().toLowerCase().trim(),
    name: userData.name?.toString().trim(),
    fullName: userData.fullName?.toString().trim()
  });
};

// Static method for finding users with flexible callUpNumber matching
userSchema.statics.findByCallUpNumber = function(callUpNumber) {
  const searchValue = callUpNumber?.toString().toUpperCase().trim();
  return this.findOne({ callUpNumber: searchValue });
};

// Instance method for generating activation token
userSchema.methods.generateActivationToken = function() {
  const crypto = require('crypto');
  this.activationToken = crypto.randomBytes(32).toString('hex');
  this.activationTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  return this.activationToken;
};

// Instance method for checking if activation token is valid
userSchema.methods.isActivationTokenValid = function(token) {
  return this.activationToken === token && 
         this.activationTokenExpiresAt && 
         this.activationTokenExpiresAt > new Date();
};

// Error handling middleware
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    // Handle duplicate key errors with user-friendly messages
    const field = Object.keys(error.keyPattern)[0];
    const fieldNames = {
      callUpNumber: 'Call-up Number',
      email: 'Email address',
      name: 'Name'
    };
    next(new Error(`${fieldNames[field] || field} already exists in the database`));
  } else {
    next(error);
  }
});

// Ensure the model is only compiled once
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;