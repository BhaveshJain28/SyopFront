import express from "express"
import dotenv from "dotenv"
import connectDB from "./confing/db.js"
dotenv.config()
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.route.js";
import contactFormRouter from "./routes/contactForm.route.js";
import geminiRoute from "./routes/gemini.route.js";
import journalRoute from "./routes/journal.route.js"
import feedbackRoute from "./routes/feedback.router.js"
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
const port = process.env.PORT || 3005
// DataBase Connection 
connectDB();

// user routes 
app.use("/api/user", userRoute);
// contact form router
app.use("/api/contact", contactFormRouter);
// gemini route
app.use("/api/gemini", geminiRoute);
// journal route
app.use("/api/journal", journalRoute);
// feedback route
app.use("/api/feedback", feedbackRoute);
// home route
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})