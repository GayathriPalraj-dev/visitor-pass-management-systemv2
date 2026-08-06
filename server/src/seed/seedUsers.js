import mongoose from 'mongoose'
import { env } from '../config/env.js'
import { connectDb } from '../database/connectDb.js'
import { Employee } from '../models/Employee.js'
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

const employees = [
  {
    _id: new mongoose.Types.ObjectId('6853f4a1f5e55d7cb56b1001'),
    employeeId: 'EMP-1001',
    name: 'Asha Rao',
    email: 'asha@example.com',
    department: 'HR',
    designation: 'Manager',
    isActive: true,
  },
  {
    _id: new mongoose.Types.ObjectId('6853f4a1f5e55d7cb56b1002'),
    employeeId: 'EMP-1002',
    name: 'Ravi Kumar',
    email: 'ravi@example.com',
    department: 'IT',
    designation: 'Engineer',
    isActive: true,
  },
]

const seedUsers = async () => {
  try {
    await connectDb()
    await User.deleteMany({})
    await Employee.deleteMany({})
    await User.create(users)
    await Employee.create(employees)

    console.log('Seed users created:')
    users.forEach((user) => console.log(`${user.role}: ${user.email} / ${user.password}`))
    console.log('Seed employees created:')
    employees.forEach((employee) => console.log(`${employee.employeeId}: ${employee.name}`))
  } catch (error) {
    console.error(`Seed failed in ${env.nodeEnv}:`, error)
    process.exitCode = 1
  } finally {
    await mongoose.connection.close()
  }
}

seedUsers()
