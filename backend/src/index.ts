import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import customerRoutes from './routes/customers'

//takes .env content into process.env
dotenv.config();

//invoking function that creates express application
const app = express();
//used process.env variable
const PORT = process.env.PORT || 3000;

//middleware - function, that sits between request and response and next middleware function, it take these arguments - req, res, next
app.use(cors()); //handling cross origin HTTP requests - requests between one domain (localhost for example) wont be blocked
app.use(express.json());  //middleware that only parses json (must have header 'Content-Type': 'application/json'), then parses it into JavaScript objects

//routes
app.use('/api/customers', customerRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})