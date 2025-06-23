import mongoose from 'mongoose';
import * as XLSX from 'xlsx';

// Import your User model
import User from '@/models/user.model'; // Adjust path as needed

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDatabase() {
  if (mongoose.connections[0].readyState) {
    return;
  }
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Auto-migrate existing numeric callUpNumbers to string format
async function autoMigrateCallUpNumbers() {
  try {
    console.log('Checking for existing numeric callUpNumbers...');
    
    // Use raw MongoDB operations to avoid schema validation issues
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Find documents with numeric callUpNumber
    const numericCallUps = await usersCollection.find({
      callUpNumber: { $type: "number" }
    }).toArray();
    
    if (numericCallUps.length > 0) {
      console.log(`Found ${numericCallUps.length} users with numeric callUpNumbers. Converting to string format...`);
      
      // Convert each numeric callUpNumber to string
      for (const user of numericCallUps) {
        let newCallUpNumber;
        
        // Handle different numeric formats
        if (user.callUpNumber < 1000) {
          // If it's a simple number like 131, convert to CALL-131
          newCallUpNumber = `CALL-${user.callUpNumber}`;
        } else {
          // If it's already a larger number, just convert to string
          newCallUpNumber = user.callUpNumber.toString();
        }
        
        await usersCollection.updateOne(
          { _id: user._id },
          { $set: { callUpNumber: newCallUpNumber } }
        );
        
        console.log(`Migrated: ${user.callUpNumber} -> ${newCallUpNumber}`);
      }
      
      console.log('Auto-migration completed successfully');
      return { migrated: true, count: numericCallUps.length };
    } else {
      console.log('No numeric callUpNumbers found. Database is already in correct format.');
      return { migrated: false, count: 0 };
    }
  } catch (error) {
    console.error('Auto-migration failed:', error);
    // Don't throw error - continue with import even if migration fails
    return { migrated: false, count: 0, error: error.message };
  }
}

// Enhanced duplicate checking that handles both string and numeric formats
async function checkDuplicatesRobust(transformedData) {
  try {
    const callUpNumbers = transformedData.map(item => item.callUpNumber).filter(Boolean);
    const emails = transformedData.map(item => item.email).filter(Boolean);
    const names = transformedData.map(item => item.name).filter(Boolean);
    
    // Use raw MongoDB queries to avoid type casting issues
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Check for existing callUpNumbers (handle both string and numeric formats)
    const existingCallUps = callUpNumbers.length > 0 
      ? await usersCollection.find({
          $or: [
            { callUpNumber: { $in: callUpNumbers } }, // Direct string match
            { callUpNumber: { $in: callUpNumbers.map(num => {
              // Try to extract numeric part for legacy numeric formats
              const match = num.match(/\d+/);
              return match ? parseInt(match[0]) : null;
            }).filter(Boolean) } } // Numeric match for legacy data
          ]
        }, { projection: { callUpNumber: 1 } }).toArray()
      : [];
      
    const existingEmails = emails.length > 0
      ? await usersCollection.find({ 
          email: { $in: emails.map(email => String(email).toLowerCase()) } 
        }, { projection: { email: 1 } }).toArray()
      : [];
      
    const existingNames = names.length > 0
      ? await usersCollection.find({ 
          name: { $in: names.map(name => String(name)) } 
        }, { projection: { name: 1 } }).toArray()
      : [];
    
    const duplicateCallUps = new Set(existingCallUps.map(user => String(user.callUpNumber)));
    const duplicateEmails = new Set(existingEmails.map(user => String(user.email).toLowerCase()));
    const duplicateNames = new Set(existingNames.map(user => String(user.name)));
    
    return { duplicateCallUps, duplicateEmails, duplicateNames };
  } catch (error) {
    console.error('Error in duplicate checking:', error);
    // Return empty sets to allow import to continue
    return { 
      duplicateCallUps: new Set(), 
      duplicateEmails: new Set(), 
      duplicateNames: new Set(),
      duplicateCheckError: error.message
    };
  }
}

// Validate Excel row data
function validateRowData(row, rowIndex) {
  const errors = [];
  
  if (!row.callUpNumber) {
    errors.push(`Row ${rowIndex + 2}: Call-up Number is required`);
  } else {
    const callUpStr = row.callUpNumber.toString().trim();
    if (!callUpStr) {
      errors.push(`Row ${rowIndex + 2}: Call-up Number cannot be empty`);
    }
  }
  
  if (!row.name) {
    errors.push(`Row ${rowIndex + 2}: Name is required`);
  }
  
  if (!row.fullName) {
    errors.push(`Row ${rowIndex + 2}: Full Name is required`);
  }
  
  if (!row.email) {
    errors.push(`Row ${rowIndex + 2}: Email is required`);
  } else {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(row.email)) {
      errors.push(`Row ${rowIndex + 2}: Invalid email format`);
    }
  }
  
  if (row.elevationYear && (isNaN(row.elevationYear) || row.elevationYear < 1900 || row.elevationYear > new Date().getFullYear())) {
    errors.push(`Row ${rowIndex + 2}: Invalid elevation year`);
  }
  
  if (row.debitBalance && (isNaN(row.debitBalance) || row.debitBalance < 0)) {
    errors.push(`Row ${rowIndex + 2}: Debit balance cannot be negative`);
  }
  
  return errors;
}

// Generate activation token and expiry
function generateActivationToken() {
  const crypto = require('crypto');
  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  return { token, expiry };
}

// Transform Excel data to match your User model
function transformRowData(row) {
  const { token, expiry } = generateActivationToken();

  return {
    // Ensure callUpNumber is always a string and properly formatted
    callUpNumber: row.callUpNumber?.toString().trim().toUpperCase(),
    
    // Required fields
    name: row.name?.toString().trim(),
    fullName: row.fullName?.toString().trim(),
    email: row.email?.toString().trim().toLowerCase(),
    
    // Optional fields
    elevationYear: row.elevationYear ? parseInt(row.elevationYear) : undefined,
    ...(row.id && { id: row.id?.toString().trim() }),
    
    // Financial field
    debitBalance: row.debitBalance ? parseFloat(row.debitBalance) : 0,
    
    // Activation fields for new users
    activationToken: token,
    activationTokenExpiresAt: expiry,
    
    // Default values for other fields
    isActive: false,
    invitationSent: false,
    lastError: "",
    role: "user"
  };
}

// Enhanced user insertion with better error handling
async function insertUsersRobust(uniqueData) {
  const insertedUsers = [];
  const failedInserts = [];
  
  for (let i = 0; i < uniqueData.length; i++) {
    const userData = uniqueData[i];
    try {
      // Try using raw MongoDB insertion first to avoid any remaining schema issues
      const db = mongoose.connection.db;
      const usersCollection = db.collection('users');
      
      // Add timestamps
      userData.createdAt = new Date();
      userData.updatedAt = new Date();
      
      const result = await usersCollection.insertOne(userData);
      
      insertedUsers.push({
        _id: result.insertedId,
        callUpNumber: userData.callUpNumber,
        id: userData.id,
        name: userData.name,
        fullName: userData.fullName,
        email: userData.email
      });
      
    } catch (insertError) {
      console.error('Error inserting user:', insertError);
      
      // Try with Mongoose as fallback
      try {
        const user = new User(userData);
        const savedUser = await user.save();
        insertedUsers.push({
          _id: savedUser._id,
          callUpNumber: savedUser.callUpNumber,
          id: savedUser.id,
          name: savedUser.name,
          fullName: savedUser.fullName,
          email: savedUser.email
        });
      } catch (mongooseError) {
        failedInserts.push({
          callUpNumber: userData.callUpNumber,
          name: userData.name,
          email: userData.email,
          error: mongooseError.message || insertError.message
        });
      }
    }
  }
  
  return { insertedUsers, failedInserts };
}

// Named export for POST method
export async function POST(request) {
  console.log('POST request received - Starting admin-friendly import');
  
  try {
    // Connect to database
    console.log('Connecting to database...');
    await connectToDatabase();
    console.log('Database connected');

    // Auto-migrate existing data
    const migrationResult = await autoMigrateCallUpNumbers();
    console.log('Migration result:', migrationResult);

    // Check content type
    const contentType = request.headers.get('content-type');
    console.log('Content-Type:', contentType);

    if (!contentType || !contentType.includes('multipart/form-data')) {
      return Response.json({ 
        error: 'Please upload an Excel file',
        hint: 'Make sure you are uploading a file through the form',
        receivedContentType: contentType 
      }, { status: 400 });
    }

    // Get the form data from the request
    console.log('Processing uploaded file...');
    const formData = await request.formData();
    
    const shouldSendInvites = formData.get('sendInvites') !== 'false';
    console.log('Should send invites:', shouldSendInvites);
    
    // Try different field names that might be used
    const file = formData.get('excel') || formData.get('file') || formData.get('excelFile');
    
    if (!file) {
      return Response.json({ 
        error: 'No Excel file was uploaded',
        hint: 'Please select an Excel file (.xlsx or .xls) and try again',
        availableFields: Array.from(formData.keys())
      }, { status: 400 });
    }

    console.log('File details:', {
      name: file.name,
      size: file.size,
      type: file.type
    });

    // Validate file type
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      return Response.json({ 
        error: 'Invalid file type - Please upload an Excel file',
        hint: 'Accepted formats: .xlsx or .xls files only',
        receivedName: file.name
      }, { status: 400 });
    }

    // Convert File to buffer and read directly
    console.log('Reading Excel file...');
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Read and parse Excel file directly from buffer
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    console.log('Excel file processed, sheet name:', sheetName);
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: ''
    });

    if (jsonData.length < 2) {
      return Response.json({ 
        error: 'Excel file appears to be empty',
        hint: 'Make sure your Excel file has a header row and at least one data row',
        rowsFound: jsonData.length
      }, { status: 400 });
    }

    // Get headers and validate
    const headers = jsonData[0];
    console.log('Headers found:', headers);
    
    const requiredHeaders = ['callUpNumber', 'name', 'fullName', 'email'];
    const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
    
    if (missingHeaders.length > 0) {
      return Response.json({ 
        error: `Missing required columns in Excel file: ${missingHeaders.join(', ')}`,
        hint: 'Please ensure your Excel file has these column headers: ' + requiredHeaders.join(', '),
        foundHeaders: headers,
        requiredHeaders: requiredHeaders
      }, { status: 400 });
    }

    // Convert rows to objects
    const dataRows = jsonData.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    }).filter(row => row.callUpNumber);

    console.log('Valid data rows found:', dataRows.length);

    if (dataRows.length === 0) {
      return Response.json({ 
        error: 'No valid data found in Excel file',
        hint: 'Make sure your data rows have values in the "callUpNumber" column',
        totalRows: jsonData.length - 1
      }, { status: 400 });
    }

    // Validate all rows
    console.log('Validating data...');
    const validationErrors = [];
    const validRows = [];
    
    dataRows.forEach((row, index) => {
      const errors = validateRowData(row, index);
      if (errors.length > 0) {
        validationErrors.push(...errors);
      } else {
        validRows.push(row);
      }
    });

    if (validRows.length === 0) {
      return Response.json({ 
        error: 'No valid rows found after validation',
        hint: 'Please check your data and fix the validation errors listed below',
        validationErrors: validationErrors.slice(0, 10),
        totalErrors: validationErrors.length
      }, { status: 400 });
    }

    // Transform valid data
    console.log('Processing data...');
    const transformedData = validRows.map(transformRowData);

    // Check for duplicates using robust method
    console.log('Checking for duplicates...');
    const { duplicateCallUps, duplicateEmails, duplicateNames, duplicateCheckError } = await checkDuplicatesRobust(transformedData);

    // Filter out duplicates
    const skippedRecords = [];
    const uniqueData = transformedData.filter((item, index) => {
      const isDuplicateCallUp = duplicateCallUps.has(String(item.callUpNumber));
      const isDuplicateEmail = duplicateEmails.has(String(item.email).toLowerCase());
      const isDuplicateName = duplicateNames.has(String(item.name));
      
      if (isDuplicateCallUp || isDuplicateEmail || isDuplicateName) {
        skippedRecords.push({
          rowIndex: index + 2,
          callUpNumber: item.callUpNumber,
          name: item.name,
          email: item.email,
          reasons: [
            ...(isDuplicateCallUp ? ['Call-up Number already exists'] : []),
            ...(isDuplicateEmail ? ['Email already exists'] : []),
            ...(isDuplicateName ? ['Name already exists'] : [])
          ]
        });
        return false;
      }
      return true;
    });

    console.log(`Processing ${uniqueData.length} unique records, skipping ${skippedRecords.length} duplicates`);

    // Insert users using robust method
    console.log('Adding users to database...');
    const { insertedUsers, failedInserts } = await insertUsersRobust(uniqueData);

    console.log('Import completed successfully');

    // Prepare user-friendly response
    const response = {
      success: true,
      message: `Import completed successfully! Added ${insertedUsers.length} new users.`,
      summary: {
        totalProcessed: dataRows.length,
        successfullyAdded: insertedUsers.length,
        skippedDuplicates: skippedRecords.length,
        failed: failedInserts.length,
        migrationPerformed: migrationResult.migrated,
        migratedCount: migrationResult.count
      },
      insertedUsers: insertedUsers,
      ...(skippedRecords.length > 0 && {
        skippedRecords: skippedRecords,
        skippedMessage: `${skippedRecords.length} records were skipped because they already exist in the database`
      }),
      ...(failedInserts.length > 0 && {
        failedInserts: failedInserts,
        failedMessage: `${failedInserts.length} records failed to import due to data issues`
      }),
      ...(validationErrors.length > 0 && {
        validationWarnings: validationErrors.slice(0, 5),
        totalValidationErrors: validationErrors.length
      }),
      ...(duplicateCheckError && {
        duplicateCheckWarning: 'Some duplicate checking may have been incomplete due to database format differences'
      }),
      invitesSent: false,
      inviteResults: null
    };

    // Send invites if requested
    if (shouldSendInvites && insertedUsers.length > 0) {
      try {
        console.log('Sending invitation emails...');
        
        const url = new URL(request.url);
        const baseUrl = `${url.protocol}//${url.host}`;
        const sendInvitesUrl = `${baseUrl}/api/send-invites`;

        const inviteResponse = await fetch(sendInvitesUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(request.headers.get('authorization') && {
              'authorization': request.headers.get('authorization')
            })
          },
          body: JSON.stringify({
            userIds: insertedUsers.map(user => user._id.toString())
          })
        });

        if (!inviteResponse.ok) {
          throw new Error(`Invitation service failed: ${inviteResponse.status}`);
        }

        const inviteResults = await inviteResponse.json();
        
        response.invitesSent = true;
        response.inviteResults = inviteResults;
        response.message = `Import completed successfully! Added ${insertedUsers.length} new users and sent invitation emails.`;
        
      } catch (inviteError) {
        console.error('Failed to send invites:', inviteError);
        response.message = `Import completed successfully! Added ${insertedUsers.length} new users. However, invitation emails could not be sent - please send them manually.`;
        response.inviteError = 'Invitation emails could not be sent automatically';
      }
    }

    return Response.json(response);

  } catch (error) {
    console.error('Import error:', error);
    
    // User-friendly error response
    return Response.json({ 
      success: false,
      error: 'Import failed due to a technical issue',
      message: 'Please try again. If the problem persists, contact your technical administrator.',
      technicalDetails: process.env.NODE_ENV === 'development' ? {
        error: error.message,
        stack: error.stack
      } : undefined
    }, { status: 500 });
  }
}

// Enhanced GET method with admin-friendly information
export async function GET() {
  try {
    await connectToDatabase();
    
    // Check current database state
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    const totalUsers = await usersCollection.countDocuments();
    const numericCallUps = await usersCollection.countDocuments({
      callUpNumber: { $type: "number" }
    });
    
    return Response.json({ 
      message: 'User Import API - Ready for Admin Use',
      status: 'operational',
      databaseInfo: {
        totalUsers,
        numericCallUpsDetected: numericCallUps,
        autoMigrationEnabled: true
      },
      instructions: {
        fileFormat: 'Excel files (.xlsx or .xls)',
        requiredColumns: ['callUpNumber', 'name', 'fullName', 'email'],
        optionalColumns: ['id', 'elevationYear', 'debitBalance'],
        callUpNumberFormat: 'CALL-131, CALL-532, etc. (text format)',
        duplicateHandling: 'Automatically skips existing records',
        invitations: 'Automatically sends invitation emails unless disabled'
      },
      adminFriendlyFeatures: [
        'Automatic data format migration',
        'User-friendly error messages',
        'Duplicate detection and handling',
        'Validation with clear feedback',
        'Automatic invitation sending',
        'Detailed import summary'
      ]
    });
  } catch (error) {
    return Response.json({ 
      message: 'User Import API',
      status: 'database connection issue',
      error: 'Please contact technical administrator'
    });
  }
}