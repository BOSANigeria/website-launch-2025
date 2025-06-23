import connectDB from "@/lib/mongodb";
import User from '@/models/user.model'
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
      await connectDB();
  
      // Get query parameters for pagination and filtering
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page')) || 1;
      const limit = parseInt(searchParams.get('limit')) || 50;
      const search = searchParams.get('search') || '';
      const status = searchParams.get('status') || '';
  
      // Build query object
      let query = {};
      
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { fullName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { callUpNumber: { $regex: search, $options: 'i' } }
        ];
      }
  
      if (status) {
        query.isActive = status === 'active';
      }
  
      // Calculate skip for pagination
      const skip = (page - 1) * limit;
  
      // Fetch users with pagination
      const users = await User.find(query)
        .select('id name fullName email elevationYear callUpNumber debitBalance isActive invitationSent role createdAt updatedAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(); // Use lean() for better performance
  
      // Get total count for pagination
      const totalUsers = await User.countDocuments(query);

      // Get toatl users in the database
      const allUsers = await User.countDocuments({});
  
      // Transform data to match frontend expectations
      const transformedUsers = users.map(user => ({
        id: user._id.toString(),
        name: user.name,
        fullName: user.fullName,
        email: user.email,
        elevationYear: user.elevationYear,
        callUpNumber: user.callUpNumber,
        debitBalance: user.debitBalance,
        status: user.isActive ? 'active' : 'inactive',
        isActive: user.isActive,
        invitationSent: user.invitationSent,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }));
  
      return NextResponse.json({
        success: true,
        users: transformedUsers,
        total: allUsers,
        pagination: {
          total: totalUsers,
          page,
          limit,
          pages: Math.ceil(totalUsers / limit)
        }
      });
  
    } catch (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to fetch users',
          message: error.message 
        },
        { status: 500 }
      );
    }
  }