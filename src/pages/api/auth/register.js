import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail } from '../../../services/user.service'; // Assume these services handle user data in your database

const registerHandler = async (req = NextApiRequest, res = NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, username, fullName, phoneNumber } = req.body;

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await createUser({
      email,
      password: hashedPassword,
      username,
      fullName,
      phoneNumber,
    });

    // Return success response
    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default registerHandler;