import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import passport from 'passport';
import './config/passportJwtStrategy.js';

const app = express()


// This will solve CORS Policy Error
const corsOptions = {
  // set origin to a specific origin.
  origin: process.env.FRONTEND_HOST,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions))

// Database Connection  
const DATABASE_URL = process.env.DATABASE_URL
connectDB(DATABASE_URL)


//JSON 
app.use(express.json())

// Passport Middleware
app.use(passport.initialize());

// Cookie Parser
app.use(cookieParser())

// Load Routes 
app.use("/api/user", userRoutes)


const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})


