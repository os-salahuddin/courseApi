const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

let courses = [
    { id: 1, name: 'Math'},
    { id: 2, name: 'English'},
    { id: 3, name: 'Biology'}
];

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    if(!result.error) {
     return res.status(400).send(result.error.details[0].message);
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course)
})

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c=> c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course was not found');
    res.send(course);
    //res.send(req.params.query.sortBy);
});

const port = process.env.PORT || 3002;
app.listen(port, () => {console.log(`Listening on port ${port}`)});
