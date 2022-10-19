const express = require('express');
const { ObjectId } = require('mongodb');

const { getDB, connectDB } = require('./database/connection');

const app = express();

app.use(express.json());

app.get('/contatos', async function (req, res, next) {
    const contatos = await getDB()
        .collection('contatos')
        .find({})
        .toArray();
    res.json(contatos);
});

app.get('/contatos/:id', async function (req, res, next) {
    const contatos = await getDB()
        .collection('contatos')
        .findOne({_id: ObjectId(req.params.id)})
    res.json(contatos);
});

app.post('/contatos', async function (req, res) {
    const contatoNovo = await getDB()
        .collection('contatos')
        .insertOne(req.body);
    res.status(201).json(contatoNovo)
})

app.put('/contatos/:id', async function (req, res) {
    await getDB()
        .collection('contatos')
        .updateOne(
            { _id: ObjectId(req.params.id) },
            { $set: req.body }
        );
    res.status(204).end();
})

app.delete('/contatos/:id', async function (req, res) {
    await getDB()
        .collection('contatos')
        .deleteOne({ _id: ObjectId(req.params.id) });
    res.status(204).end();
})


connectDB(() => {
    app.listen(3000, () => console.log("API is on!"))
});