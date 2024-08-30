const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./src/routes/userRouter');

app.use(express.json());
app.use(cors());
app.use('/api/user',userRouter);
app.use('/api/getUsers',userRouter);
app.use('/api',userRouter);
app.use('/api',userRouter);
app.use('/api',userRouter);


app.post('/test',(req,res)=>{
    res.status(200).json({message:"App pass the test!"});
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
