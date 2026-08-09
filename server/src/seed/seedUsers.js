import mongoose from 'mongoose'
import { env } from '../config/env.js'
import { connectDb } from '../database/connectDb.js'
import { Employee } from '../models/Employee.js'
import { User } from '../models/User.js'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: process.env.SEED_ADMIN_PASSWORD,
    role: 'ADMIN',
  },
  {
    name: 'Reception User',
    email: 'reception@example.com',
    password: process.env.SEED_RECEPTION_PASSWORD,
    role: 'RECEPTIONIST',
  },
  {
    name: 'Employee User',
    email: 'employee@example.com',
    password: process.env.SEED_EMPLOYEE_PASSWORD,
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
    const missingSeedPasswords = users.filter((user) => !user.password).map((user) => user.role)

    if (missingSeedPasswords.length > 0) {
      throw new Error(`Missing seed passwords for roles: ${missingSeedPasswords.join(', ')}`)
    }

    await connectDb()
    await User.deleteMany({})
    await Employee.deleteMany({})
    const createdUsers = await User.create(users)

    const employeeUser = createdUsers.find((user) => user.role === 'EMPLOYEE')

    const employeeList = employees.map((employee) =>
      employee.employeeId === 'EMP-1002' && employeeUser
        ? { ...employee, user: employeeUser._id }
        : employee,
    )

    await Employee.create(employeeList)

    console.log('Seed users created:')
    users.forEach((user) => console.log(`${user.role}: ${user.email}`))
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
