const express = require('express');
const router = express.Router();
const Project = require('../models/Project')
const Task = require('../models/Task')
const User = require('../models/User')

// Get All Projects route
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects)
})

// Create new Project
router.post('/new/:userid', async (req, res) => {
  
  const newProject = new Project( req.body ); 
  const savedProject = await newProject.save()
  let user=await User.findById(req.params.userid)
  user.projectId.push(newProject._id)
  user.save() // mongo save method
  res.json(savedProject) // respond with json to our post endpoint
});

// Getter by id
router.get('/:projectId', async (req, res) => {
  const d = await Project.findById({ _id : req.params.projectId })
  res.json(d)
})

// Delete a Project by id
router.delete('/delete/:projectId', async (req, res) => {
  const project = await Project.findById({ _id : req.params.projectId })
  let task
  for(let i=0;i<project.task.length;i++){
    task= await Task.findByIdAndDelete({ _id : project.task[i] })
  }
  const pDelete = await Project.findByIdAndDelete({ _id : req.params.projectId })
  
  res.json(pDelete)
})

// Update a Project by id
router.put('/update/:projectId', async (req, res) => {
  const pUpdate = await Project.updateOne(
    { _id: req.params.id }, 
    
    //{ $set: req.body }
    {
        name:"TestProject2", 
        description:" Second Test to see if the Project get's created",
        creatorId:"622634786d6c3db05683f829",
        userId:["622634786d6c3db05683f829","332634786d6c3db05683f784"],
        taskId:["111634786a6c3db05683f784"]
    }
  )
  res.json(pUpdate)
})
//Create a new Task
router.post('/:projectId/newTask',async (req, res) => {
  let project
  const newtask= new Task(req.body);
 try{
   project=await Project.findById(req.params.projectId)
   project.task.push(newtask._id);
   const savedTask = await newtask.save()
   project.save(); // mongo save method
  res.json(savedTask);
    
 } catch(e){

 }
  
})
router.get('/:projectId/:taskid', async (req, res) => {
  const d = await Task.findById({ _id : req.params.taskid })
  res.json(d)
})
router.delete('/:projectId/:taskid/delete', async (req, res) => {
  let dTask;
  let project;
  try{
    dTask = await Task.findByIdAndDelete({ _id : req.params.taskid })
    project=await Project.findById(req.params.projectId)
    let index=project.task.indexOf(req.params.taskid)
    project.task.splice(index,1);
    
    project.save(); // mongo save method   
  } catch(e){
 
  }
  res.json(dTask)
})





module.exports = router