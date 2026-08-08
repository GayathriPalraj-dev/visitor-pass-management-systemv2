import mongoose from 'mongoose'
import dns from 'node:dns'
import { env } from '../config/env.js'

// Workaround for querySrv ECONNREFUSED on local networks where the router's
// DNS server (e.g. 192.168.1.1) does not answer Node's SRV queries that the
// mongodb+srv:// connection scheme requires. Using reliable public resolvers
// lets mongoose resolve the Atlas shard SRV records correctly.
// This is applied at the shared connection layer so every process that
// connects to MongoDB (server, seed scripts, etc.) uses it.
dns.setServers(['8.8.8.8', '1.1.1.1'])

export const connectDb = async () => {
  const connection = await mongoose.connect(env.mongoUri)
  console.log(`MongoDB connected: ${connection.connection.host}`)
}
