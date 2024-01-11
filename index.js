const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

let { course } =  require('./models');

app.get('/', (req, res) => {
    res.send('Api is UP!');
});

app.get('/api/courses', (req, res) => {
    course.findAll().then((courses) => {
        res.status(200).send(courses);
    }).catch((err) => {
        console.log(err);
    });
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        course.update({
            name: req.body.name
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }

    res.status(200).send('Update successful');
})

app.put('/api/courses/:id', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    course.findAll().then((courses) => {
        res.status(200).send(courses);
    }).catch((err) => {
        console.log(err);
    });
});

app.delete('/api/courses/:id', (req, res) => {
    course.destroy({ where: { name : req.params.id } });
    res.send('delete');
})

function validateCourse(course)
{
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

app.get('/api/courses/:id', (req, res) => {
    course.findAll({where:{id:req.params.id}}).then((courses) => {
        res.status(200).send(courses);
    }).catch((err) => {
        console.log(err);
    });
});

const db = require('./models');

const port = process.env.PORT || 3002;
db.sequelize.sync().then((req) => {
    app.listen(port, () => {console.log(`Listening on port ${port}`)});
});
