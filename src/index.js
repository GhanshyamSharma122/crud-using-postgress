import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from "./config/db.js";
import userRouter from "./routes/user.route.js"
import errorHandling from "./middlewares/errorhandler.js";
import createUserTable from "./data/createUserTable.js";
dotenv.config();
const app=express()
const port =process.env.PORT||8080
//middlewares
app.use(express.json());
app.use (cors());
//routes
app.use("/api",userRouter)
//error handling middleware
app.use(errorHandling)
//create table before starting server
createUserTable()
//testing postgres connection
app.get("/",async(req, res)=>{
    const result=await pool.query("select current_database()")
    res.send("database name is "+result.rows[0].current_database)
})
//server running
app.listen(port,()=>{
    console.log(`server is running in localhost:${port}`)
})