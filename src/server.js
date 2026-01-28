require('dotenv').config();

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors());
app.use(express.json())

app.use('/api/auth', require('./routes/auth.router'))
app.use('/api/notes', require('./routes/notes.router'))


app.listen(process.env.PORT,()=> {console.log(`server running on port ${process.env.PORT}`)})