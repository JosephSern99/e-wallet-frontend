import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to get a user by username
export const getUserByUsername = async (username) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw new Error('Error fetching user by username');
  }
};

// Function to create a new user
export const createUser = async (userData) => {
  const { email, password, username, fullName, phoneNumber } = userData;
  try {
    const result = await pool.query(
      'INSERT INTO users (email, password, username, full_name, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, password, username, fullName, phoneNumber]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating new user:', error);
    throw new Error('Error creating new user');
  }
};