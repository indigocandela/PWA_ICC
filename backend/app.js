//mongodb+srv://admin:4kfwZLGmwqK9qws6@cluster0.suqzf.mongodb.net/PWA_ICC_Database?retryWrites=true&w=majority
const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const swaggerUi=require('swagger-ui-express')
const yaml=require('yamljs')

//create express app

const app=express();
const swaggerDefinition=yaml.load('./swagger.yaml')
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerDefinition))

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // If using .fetch and not axios
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//database stuff

const uri = "mongodb+srv://admin:4kfwZLGmwqK9qws6@cluster0.suqzf.mongodb.net/PWA_ICC_Database?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected")
})
.catch(err => console.log(err))

app.use(bodyParser.json())

// routes

const ProjectRoutes=require('./routes/Project')
app.use("/projects", ProjectRoutes)
const Takroutes=require('./routes/Task')
app.use("/tasks", Takroutes)
const UserRoutes=require('./routes/User')
app.use("/users", UserRoutes)



// start server
app.listen(3000, () => {
  console.log("Listening at port 3000")
})