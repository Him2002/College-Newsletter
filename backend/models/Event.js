const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide event title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide event description'],
  },
  image: {
    type: String,
    required: [true, 'Please upload an event image'],
  },
  eventDate: {
    type: Date,
    required: [true, 'Please provide event date'],
  },
  eventTime: {
    type: String,
    required: [true, 'Please provide event time'],
  },
  month: {
    type: Number,
    default: function () {
      return new Date(this.eventDate).getMonth() + 1;
    },
  },
  year: {
    type: Number,
    default: function () {
      return new Date(this.eventDate).getFullYear();
    },
  },
  department: {
    type: String,
    required: [true, 'Please provide department'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  rejectionReason: {
    type: String,
    default: null,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', eventSchema);
