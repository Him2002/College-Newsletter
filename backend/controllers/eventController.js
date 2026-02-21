const Event = require('../models/Event');
const User = require('../models/User');

// @route   POST /api/events
// @desc    Create an event
// @access  Private (students)
exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, eventDate, eventTime, department } = req.body;
    const userId = req.userId;

    if (!title || !description || !eventDate || !eventTime || !department) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const event = await Event.create({
      title,
      description,
      image: req.file.path,
      eventDate,
      eventTime,
      department,
      createdBy: userId,
    });

    const populatedEvent = await event.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      event: populatedEvent,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/events/my
// @desc    Get user's events
// @access  Private
exports.getMyEvents = async (req, res, next) => {
  try {
    const userId = req.userId;

    const events = await Event.find({ createdBy: userId })
      .populate('createdBy', 'name email department')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/events/pending
// @desc    Get pending events (for HOD)
// @access  Private (HOD)
exports.getPendingEvents = async (req, res, next) => {
  try {
    const userDepartment = req.userDepartment;

    const events = await Event.find({
      status: 'pending',
      department: userDepartment,
    })
      .populate('createdBy', 'name email department')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/events/:id/approve
// @desc    Approve an event
// @access  Private (HOD)
exports.approveEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.status !== 'pending') {
      return res.status(400).json({ message: 'Event is not in pending status' });
    }

    event.status = 'approved';
    event.approvedBy = userId;
    await event.save();

    const updatedEvent = await event.populate([
      { path: 'createdBy', select: 'name email department' },
      { path: 'approvedBy', select: 'name email' },
    ]);

    res.status(200).json({
      success: true,
      message: 'Event approved successfully',
      event: updatedEvent,
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/events/:id/reject
// @desc    Reject an event
// @access  Private (HOD)
exports.rejectEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rejectionReason } = req.body;

    if (!rejectionReason) {
      return res.status(400).json({ message: 'Please provide a rejection reason' });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.status !== 'pending') {
      return res.status(400).json({ message: 'Event is not in pending status' });
    }

    event.status = 'rejected';
    event.rejectionReason = rejectionReason;
    await event.save();

    const updatedEvent = await event.populate('createdBy', 'name email department');

    res.status(200).json({
      success: true,
      message: 'Event rejected successfully',
      event: updatedEvent,
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (creator or admin)
exports.deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const userRole = req.userRole;
    const userDepartment = req.userDepartment;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Authorization rules:
    // - Admin can delete any event
    // - Creator can delete their own event (any status)
    // - HOD can delete events belonging to their department (any status)
    const isCreator = event.createdBy.toString() === userId;
    const isAdmin = userRole === 'admin';
    const isHodOfDept = userRole === 'hod' && userDepartment && event.department === userDepartment;

    if (!isCreator && !isAdmin && !isHodOfDept) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private (creator)
exports.updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { title, description, eventDate, eventTime, department } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Only creator can update
    if (event.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    // Only pending events can be updated
    if (event.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending events can be updated' });
    }

    if (title) event.title = title;
    if (description) event.description = description;
    if (eventDate) event.eventDate = eventDate;
    if (eventTime) event.eventTime = eventTime;
    if (department) event.department = department;
    if (req.file) event.image = req.file.path;

    await event.save();

    const updatedEvent = await event.populate('createdBy', 'name email department');

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      event: updatedEvent,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/events/month/:month/:year
// @desc    Get approved events by month and year
// @access  Public
exports.getEventsByMonth = async (req, res, next) => {
  try {
    const { month, year } = req.params;

    const events = await Event.find({
      status: 'approved',
      month: parseInt(month),
      year: parseInt(year),
    })
      .populate('createdBy', 'name email department')
      .sort({ eventDate: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/events/approved
// @desc    Get all approved events
// @access  Public
exports.getApprovedEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ status: 'approved' })
      .populate('createdBy', 'name email department')
      .sort({ eventDate: -1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    next(error);
  }
};
