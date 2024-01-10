const express = require('express');
const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema

let ConceptSchema = new Schema({
  concept:{
    type: String,
    required: true
  },
  definition:{
    type: String,
    required: true
  },
})
const Concept = mongoose.model('Concept', ConceptSchema);
module.exports = Concept;
