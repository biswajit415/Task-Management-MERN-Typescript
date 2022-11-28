import express, { Express} from 'express';
import cors from 'cors';
import  TaskRoute  from './routes/taskRoute'
import "dotenv/config";
import connectDB from './config/db';

const app:Express = express();

app.use(express.json());
app.use(cors())
connectDB()

app.use("/api/tasks", TaskRoute);

app.listen(3000,()=>console.log("Running on Port: 3000"))