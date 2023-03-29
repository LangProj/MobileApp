import express from 'express';
import mongoose from 'mongoose';

mongoose
.connect("mongodb+srv://totskaiasonia:gc66WkdNxoZ4Nl9A@cluster0.wupwzix.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB error", err));

const app = express();

app.listen(3000, ()=>{
    console.log('server is listening on port 3000');
})