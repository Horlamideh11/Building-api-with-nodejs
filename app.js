//invoke express module for http calls
const express = require('express');
const app = express();
app.use(express.json());
//invoke the Joi module for validation
const Joi = require('joi');
//create an array of courses
const courses = [
    {id:1,name:'Javascript'},
    {id:2,name:'Python'},
    {id:3,name:'C++'}
]
//create get requests endpoints
app.get('/api/courses',(req,res)=>{
res.send(courses);
});
//use route and query parameters here
app.get('/api/courses/:id',(req,res)=>{
const course = courses.find(c=> c.id ===parseInt(req.params.id));
if(!course) res.status(404).send('The name you requested for is an invalid name');
res.send(name); 
})
//create post endpoints
app.post('/api/courses',(req,res)=>{
const schema = {
 name:Joi.string().min(3).required()
};
const result = Joi.validate(req.body,schema);
if (result.error)
{
res.status(400).send(result.error.details[0].message);
return;
}
const name = {
    id:courses.length + 1,
    name: req.body.name
}
courses.push(name);
res.send(name);
});
//create put endpoint
app.put('/api/courses/:id',(req,res)=>{
const course = courses.find(c=> c.id===parseInt(req.params.id));
if(!course) res.status(404).send('The course you requested for is an invalid name');
const {error} = validateCourse(req.body);
if (error){
    res.status(400).send(error.details[0].message);
    return;
}
course.name = req.body.name;
res.send(course);
});
//endpoint to delete course
app.delete('/api/courses/:id',(req,res)=>{
// search for course to delete
const course = courses.find(c=> c.id ===parseInt(req.params.id));
// return 404 error if it does not exist
if(!course) res.status(404).send('The course you requested for does not exist');
//if it exists delete it
const index = courses.indexOf(course);
courses.splice(index,1);
//return deleted course
res.send(course);
});
//create validation function
function validateCourse(course)
{
    const schema = {
        name:Joi.string().min(3).required()
       };
       return Joi.validate(course,schema);
}
//set port to environmental variable
const PORT = process.env.port || 3000;

//listen to port
app.listen(PORT,()=>console.log(`Listening on port ${PORT}, waiting to make changes`));