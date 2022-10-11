const router = require('express').Router();
const { request } = require('express');
const Post = require('../models/posts.model');

router.route('/').get((req, res) => {
    Post.find((err, data) =>{
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data); 
        }
    })
})

router.route('/upload').post((req, res) => {
    // const object = {
    //     caption: req.body.caption,
    //     user: req.body.user,
    //     image: {
    //         data: fs.readFileSync(path.join('./uploads/'+req.filename)),
    //         contentType: 'image/*'
    //     },
    //     comments: []
    // }
    const newPost = new Post(req.body);
    console.log(newPost);
    Post.create(newPost, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
        

})


module.exports = router;