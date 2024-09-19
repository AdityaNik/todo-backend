const express = require('express');
require('dotenv').config()
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_STRING, { dbName: process.env.DB_NAME });

const crudScheme = new mongoose.Schema({
  name: String,
  roll: Number,
  marks: Number,
})

const Crud = mongoose.model('curd', crudScheme)

app.get('/', (req, res) => {
  res.json({
    'msg': 'Hii there'
  })
})

app.get('/insert', (req, res) => {
  const newCrud = new Crud({ name: 'aditya', roll: 10, marks: '90' });
  newCrud.save();
  res.json({
    'msg': 'Inserted Successfully'
  })
});

app.get('/read', async (req, res) => {
  const users = await Crud.find();
  res.json({
    'msg': 'fetched Successfully',
    "data": {
      users
    }
  })
});

app.get('/update', async (req, res) => {
  const update = await Crud.updateOne({ name: 'aditya' }, { name: 'new user', roll: 1, marks: 80 });
  res.json({
    'msg': 'Updated Successfully',
    "data": {
      update
    }
  })
});


app.get('/delete', async (req, res) => {
  const deleteRecord = await Crud.deleteOne({ name: 'aditya' });
  res.json({
    'msg': 'deleted Successfully',
    "data": {
      deleteRecord
    }
  })
});

app.listen(3000, () => {
  console.log("Application started");
})