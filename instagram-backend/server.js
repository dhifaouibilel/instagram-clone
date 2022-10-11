const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// using pusher to making mongodb real time 
const Pusher = require('pusher');

const app = express();
const port = process.env.PORT || 5000;

const pusher = new Pusher({
    appId: "1484523",
    key: "c4d4f433d7748b04d435",
    secret: "4465d90d9c178a6abc16",
    cluster: "eu",
    useTLS: true
  });

// middleware
app.use(express.json());
app.use(cors());

// DB connection
mongoose.connect(process.env.MONGODB_URL)
mongoose.connection.once('open', ()=>{
    console.log('Connection start to mongodb');
    const changeStream = mongoose.connection.collection('posts').watch();
    changeStream.on('change', (change)=>{
        console.log('change triggered on pusher ...');
        console.log(change);
        console.log('End of change');
        if(change.operationType === 'insert') {
            const postDetails = change.fullDocument;
            pusher.trigger('posts', 'inserted', {
                user : postDetails.user,
                caption: postDetails.caption,
                image: postDetails.image
            });
        } else {
            console.log('Unknown trigger from pusher');
        }
    })
})

// api endpoint

const postsRoute = require('./routes/postsRoute');

app.use('/', postsRoute);




app.listen(port, ()=>{
    console.log('server running on port '+port);
})
