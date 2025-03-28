const mongoose = require('mongoose');

const academicSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Academic', academicSchema); 