const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require=('jsonwebtoken')

// Get All Users route
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users)
})

// Create new User
router.post('/new', async (req, res) => {
  
  const newUser = new User(
    //req.body // What the Vue App is sending
    {
      name:"TestUser", 
      email:" real@test.test",
      phonenumber:"62263476",
      password:"real"
  }
    
  ); 
  const savedUser= await newUser.save() // mongo save method
  res.json(savedUser) // respond with json to our post endpoint
});

// Getter by id
router.get('/:id', async (req, res) => {
  const d = await User.findById({ _id : req.params.id })
  res.json(d)
})

// Delete a User by id
router.delete('/:id/delete', async (req, res) => {
  const tDelete = await User.findByIdAndDelete({ _id : req.params.id })
  res.json(tDelete)
})

// Update a User by id
router.put('/:id/update', async (req, res) => {
  const user = await User.findById(
    { _id: req.params.id }) 
    
    //{ $set: req.body }
 
    user.name="TestUser3", 
    user.email=" test@test.test",
    user.phonenumber="62263476",
    user.password="test4"
  
  
  
    user.save()
  res.json(user)
})
router.post('/login', async (req, res) => {
  
  let body = req.body;
  let userDB= await User.findOne({ username: body.username })
    /*if (error) {
      return res.status(500).json({
         ok: false,
         error: error
      })
   }*/
// Verifica que exista un usuario con el mail escrita por el usuario.
  if (!userDB) {
     return res.status(400).json({
       ok: false,
       error: {
           message: "User not found"
       }
    })
  }
// Valida que la contraseña escrita por el usuario, sea la almacenada en la db
  if (! bcrypt.compareSync(body.password, userDB.password)){
     return res.status(400).json({
        ok: false,
        error: {
          message: "Password not valid"
        }
     });
  }
// Genera el token de autenticación
  /* let token = jwt.sign({
          user: userDB,
       }, process.env.SEED_AUTENTICACION, {
       expiresIn: process.env.CADUCIDAD_TOKEN
   })*/
   res.json({
       ok: true,
       user: userDB,
       //token,
   })
})
  

router.post('/register', async (req, res)=> {
  
  let body = req.body;
  let salt=bcrypt.genSaltSync(10)
  
 var name=body.name
 var username=body.username
 var email=body.email
 var phonenumber=body.phonenumber
 var passwordaf=body.password
let password= bcrypt.hashSync(passwordaf,salt)
console.log(password)
  
  let user = new User({
    name,
    username,
    email,
    phonenumber,
    password,
  });
  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
         ok: false,
         err,
      });
      
    }
    res.json({
          ok: true,
          user: userDB
       });
       
    })
});




module.exports = router