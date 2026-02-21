const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const upload = require('../middleware/multer');
const {
  createEvent,
  getMyEvents,
  getPendingEvents,
  approveEvent,
  rejectEvent,
  deleteEvent,
  updateEvent,
  getEventsByMonth,
  getApprovedEvents,
} = require('../controllers/eventController');

// Public routes
router.get('/approved', getApprovedEvents);
router.get('/month/:month/:year', getEventsByMonth);

// Protected routes
router.post('/', auth, upload.single('image'), createEvent);
router.get('/my', auth, getMyEvents);
router.put('/:id', auth, upload.single('image'), updateEvent);
router.delete('/:id', auth, deleteEvent);

// HOD/Admin routes
router.get('/pending', auth, roleMiddleware(['hod', 'admin']), getPendingEvents);
router.put('/:id/approve', auth, roleMiddleware(['hod', 'admin']), approveEvent);
router.put('/:id/reject', auth, roleMiddleware(['hod', 'admin']), rejectEvent);

module.exports = router;
