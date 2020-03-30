//invoke express module for http calls
const express = require('express');
const app = express();
app.use(express.json());
//invoke the Joi module for validation
const Joi = require('joi');
//create an array of genres
const genres = [
    {id:1,name:'Action'},
    {id:2,name:'Comedy'},
    {id:3,name:'Sci-fi'}
]
//create get requests endpoints
app.get('/api/genres',(req,res)=>{
res.send(genres);
});
//use route and query parameters here
app.get('/api/genres/:id',(req,res)=>{
const course = genres.find(c=> c.id ===parseInt(req.params.id));
if(!course) res.status(404).send('The name you requested for is an invalid name');
res.send(name); 
})
//create post endpoints
app.post('/api/genres',(req,res)=>{
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
    id:genres.length + 1,
    name: req.body.name
}
genres.push(name);
res.send(name);
});
//create put endpoint
app.put('/api/genres/:id',(req,res)=>{
const genre = genres.find(c=> c.id===parseInt(req.params.id));
if(!genre) res.status(404).send('The genre you requested for is an invalid name');
const {error} = validateCourse(req.body);
if (error){
    res.status(400).send(error.details[0].message);
    return;
}
course.name = req.body.name;
res.send(genre);
});
//endpoint to delete course
app.delete('/api/genres/:id',(req,res)=>{
// search for course to delete
const genre = genres.find(c=> c.id ===parseInt(req.params.id));
// return 404 error if it does not exist
if(!genre) res.status(404).send('The genre you requested for does not exist');
//if it exists delete it
const index = genres.indexOf(course);
genres.splice(index,1);
//return deleted course
res.send(genre);
});
//create validation function
function validateCourse(genre)
{
    const schema = {
        name:Joi.string().min(3).required()
       };
       return Joi.validate(genre,schema);
}
//set port to environmental variable
const PORT = process.env.port || 3000;

//listen to port
app.listen(PORT,()=>console.log(`Listening on port ${PORT}, waiting to make changes`));