const express = require('express');
const moongose = require('mongoose')
const app = express();

const authRouter = require('./route/userRoute');

app.use(express.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/auth/get-started', authRouter);

app.use((req, res) => {
  res.status(404).send('Route not found: ' + req.originalUrl);
});

moongose.connect('mongodb+srv://madesh10cse_db_user:3B5EP2p6gZlcMw85@chat-application.ioat8cu.mongodb.net/?appName=chat-application')
.then(result=>{
    app.listen(8080,()=>{
        console.log('✅ Server is running on http://localhost:8080')
    })
})
.catch(err=>{
    console.log(err)
})

