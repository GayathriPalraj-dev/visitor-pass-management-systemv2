import mongoose from 'mongoose'
import { env } from '../config/env.js'
import { connectDb } from '../database/connectDb.js'
import { User } from '../models/User.js'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'Admin@123',
    role: 'ADMIN',
  },
  {
    name: 'Reception User',
    email: 'reception@example.com',
    password: 'Reception@123',
    role: 'RECEPTIONIST',
  },
  {
    name: 'Employee User',
    email: 'employee@example.com',
    password: 'Employee@123',
    role: 'EMPLOYEE',
  },
]

const seedUsers = async () => {
  try {
    await connectDb()
    await User.deleteMany({})
    await User.create(users)

    console.log('Seed users created:')
    users.forEach((user) => console.log(`${user.role}: ${user.email} / ${user.password}`))
  } catch (error) {
    console.error(`Seed failed in ${env.nodeEnv}:`, error)
    process.exitCode = 1
  } finally {
    await mongoose.connection.close()
  }
}

seedUsers()
