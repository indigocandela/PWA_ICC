const express = require('express');
const router = express.Router();
const Task = require('../models/Task')

// Get All Tasks route
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks)
})

/* Create new task
router.post('/new', async (req, res) => {
  
  const newTask = new Task(
    req.body // What the Vue App is sending
    
  ); 
  const savedTask = await newTask.save() // mongo save method
  res.json(savedTask) // respond with json to our post endpoint
});*/

// Getter by id
router.get('/:id', async (req, res) => {
  const t = await Task.findById({ _id : req.params.id })
  res.json(t)
})

//Delete a task by id
router.delete('/:id/delete', async (req, res) => {
  const tDelete = await Task.findByIdAndDelete({ _id : req.params.id })
  res.json(tDelete)
})

// Update a task by id
router.put('/:id/update', async (req, res) => {
  const tUpdate = await Task.updateOne({ _id: req.params.id }, 
    
    { $set: req.body }
    
  )
  res.json(tUpdate)
})



module.exports = router