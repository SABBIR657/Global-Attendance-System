const express = require('express');
const connectDB = require('./db');
const authenticate = require('./middleware/authenticate');
const routes = require('./routes/index.router')


const app =  express();

app.use(express.json()); //because the incoming data from the body is need to convert to the json format and by the help of body parser
app.use(routes)


//this is a private route

app.get('/private', authenticate, async (req, res)=>{

    console.log('i am the user', req.user)

    return res.status(200).json({
        message: 'calling from private route'
    })
   
})

app.get('/public', (req, res)=>{
    return res.status(200).json({
        message: 'calling from public route'
    })
})



app.get('/', (req, res)  =>{
    const obje = {
        name: 'sabbir',
        email: "sabbir@gmail.com",
    }

    res.json(obje);
})


//global error handler for server errors

app.use((err, req, res, next)=>{
    console.log(err);

    const message = err.message ? err.message : 'server error occurred '
    const status = err.status ? err.status : 500
    res.status(status).json({
        message
    })
})

connectDB('mongodb://localhost:27017/attandanceDb').then(()=>{
console.log('database connection established');
    app.listen(4000,()=>{
        console.log('listening on port 4000');
    })
    
}).catch((err)=>{
    console.log(err);
})

