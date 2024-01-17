const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

let { course } =  require('./models');

app.get('/', (req, res) => {
    res.send('Api is UP!');
});

app.get('/api/courses',async (req, res) => {
   try {
       const course = await course.findAll();
       res.status(200).send(course);
   } catch (err) {
       console.error(err);
       res.status(500).send('Internal Server Error');
   }
});

app.post('/api/courses', async (req, res) => {
    const { error } = validateCourse(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
       await course.create({
            name: req.body.name
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }

    res.status(200).send('Create successful');
})

app.put('/api/courses/:id', async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        await course.update(
            { name: req.body.name },
            { where: { id: req.params.id } }
        );

        res.status(200).send('Update successful');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

app.delete('/api/courses/:id',  async (req, res) => {
    try {
        await course.destroy({where: {name: req.params.id}});
        res.send('delete');
    } catch (err) {
        console.error(err);
        res.status(500).send('Delete Successful');
    }
})

function validateCourse(course)
{
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

app.get('/api/courses/:id', (req, res) => {
    try {
        const course = course.findAll({ where: { id: req.params.id } });
        res.status(200).send(course);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

const db = require('./models');

const port = process.env.PORT || 3002;
db.sequelize.sync().then((req) => {
    app.listen(port, () => {console.log(`Listening on port ${port}`)});
});
