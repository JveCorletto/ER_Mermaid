const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/er-diagram-tool', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const entitySchema = new mongoose.Schema({
    name: String,
    attributes: [
        {
            name: String,
            type: {
                type: String,
                enum: ['string', 'int', 'float', 'boolean'],
                default: 'string'
            },
            primaryKey: Boolean,
        },
    ],
});

const Entity = mongoose.model('Entity', entitySchema);

// Ruta para agregar una entidad
app.post('/entities', async (req, res) => {
    try {
        const entity = new Entity(req.body);
        await entity.save();
        res.status(201).send(entity);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Ruta para obtener todas las entidades
app.get('/entities', async (req, res) => {
    try {
        const entities = await Entity.find();
        res.status(200).send(entities);
    } catch (error) {
        res.status(500).send(error);
    }
});

const relationshipSchema = new mongoose.Schema({
    fromEntity: String,
    fromAttribute: String,
    toEntity: String,
    toAttribute: String,
    name: String, // Añadir el campo 'name'
});

const Relationship = mongoose.model('Relationship', relationshipSchema);

// Ruta para agregar una relación
app.post('/relationships', async (req, res) => {
    try {
        const relationship = new Relationship(req.body);
        await relationship.save();
        res.status(201).send(relationship);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Ruta para obtener todas las relaciones
app.get('/relationships', async (req, res) => {
    try {
        const relationships = await Relationship.find();
        res.status(200).send(relationships);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});