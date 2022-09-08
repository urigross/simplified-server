const express = require('express');
const { route } = require('.');
const author = require('../models/author');
const router = express.Router();
const Author = require('../models/author');

// All authers Route
router.get('/', async (req,res)=>{
    let searchOptions = {};
    if(req.query.name !== null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i');  // Search for just a part of the text  , i flag means not case sensetive
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index',
        { 
            authors,
            searchOptions: req.query 
        });
    } catch  {
        console.log('error searching')
        res.redirect('/');        
    }
})

// New author route
router.get('/new', (req, res)=>{
    res.render('authors/new', { author: new Author()});
})

// Create Author route
router.post('/', async (req, res)=>{
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save();
        res.redirect('authors');        
    }
    catch{
                res.render('authors/new',{
                author,
                errorMessage: 'Error creating Author'
            })
    }
    // author.save((err, newAuthor)=>{
    //     console.log('err= ',err);
    //     if(err){
    //         res.render('authors/new',{
    //             author:author,
    //             errorMessage: 'Error creating Author'
    //         })
    //     } 
    //     else{
    //         //res.redirect(`authors/${newAuthor.id}`);
    //         res.redirect(`authors`);
    //     }               
    // })
})

module.exports = router;