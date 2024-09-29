const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt  =  require('jsonwebtoken');

const JWT_SECRET = 'Vikasisgood$oy';

//Create a User using: POST "/api/auth/createuser" , Doesnt require auth
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleastr 5 character').isLength({min:5}),
], async(req,res)=>{
  //If there are errors,return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

//check whether user exist already with this  email

try{
let user = await User.findOne({email: req.body.email});
if(user){
  return res.status(400).json({error: "Sorry user exist with this email"})
}

const salt = await bcrypt.genSalt(10);
const secPass = await bcrypt.hash(req.body.password, salt);
//Create a new user
  user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET) 
     
      // res.json(user)
      res.json({authtoken})
      }
      //Catch error
      catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
      }
})

module.exports = router;