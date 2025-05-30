import EventData from "../models/EventSchmea.js";



export const createEvent = async (req, res) =>{
  try {
      const { role, id: userId } = req.user;
      const { title, description, date, type, targetTeams } = req.body;
        // Validation
      const validationErrors = [];
      if (!title||title.trim().length === 0) {
          validationErrors.push({ message: "Title is required" });
      }
          if (!date) {
          validationErrors.push('Date is required');
          } else {
          const eventDate = new Date(date);
          if (isNaN(eventDate.getTime())) {
              validationErrors.push('Invalid date format');
          }         
          else if (eventDate.getDay() === 0) {
          validationErrors.push('Events cannot be scheduled on Sundays');
          }
       }
         if (!type || !['company_event', 'team_event'].includes(type)) {
      validationErrors.push('Type must be either "company_event" or "team_event"');
    }

    // Authorization checks
    if (role !== 'admin') {
      // Only admins can create company events
      if (type === 'company_event') {
        validationErrors.push('Only administrators can create company events');
      }
      

    }

    // Team event specific validation
    if (type === 'team_event') {
      if (!targetTeams || !Array.isArray(targetTeams) || targetTeams.length === 0) {
        validationErrors.push('Target teams are required for team events');
      } else {
        // Validate team names (optional - adjust based on your valid teams)
        const validTeams = ['developer', 'marketing', 'hr', 'finance', 'sales'];
        const invalidTeams = targetTeams.filter(t => !validTeams.includes(t));
        if (invalidTeams.length > 0) {
          validationErrors.push(`Invalid team(s): ${invalidTeams.join(', ')}`);
        }
      }
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Please fix the following errors',
        details: validationErrors
      });
    }

    // Prepare event data
    const eventData = {
      title: title.trim(),
      description: description ? description.trim() : '',
      date: new Date(date),
      type,
      createdBy: userId // Track who created the event
    };

    // Add targetTeams only for team events
    if (type === 'team_event') {
      eventData.targetTeams = targetTeams;
    }
    //create Event
     const event = new EventData(eventData);
    const savedEvent = await event.save();

    // Return the created event (excluding sensitive data)
    const responseEvent = {
      _id: savedEvent._id,
      title: savedEvent.title,
      description: savedEvent.description,
      date: savedEvent.date,
      type: savedEvent.type,
      targetTeams: savedEvent.targetTeams,
      createdAt: savedEvent.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: responseEvent
    });
    }
    catch(err){
        console.error('Error creating event:', err.message);
    
    // Handle MongoDB validation errors
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(err => err.message);
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Invalid event data',
        details: validationErrors
      });
      
    }
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create event. Please try again later.'
    });
    }
}


export const getEvent = async (req, res) =>{
    try{
         const { department, role } = req.user;
            // Validate user department
        if (!department) {
        return res.status(400).json({
            error: 'User department not found',
            message: 'User must have a department assigned to view events'
        });
        }
         
        const query = role === 'admin' 
          ? {} // Admins get everything
          : {
              $or: [
                { type: 'company_event' },
                { 
                  type: 'team_event',
                  targetTeams: { $in: [department] }
                }
              ]
            };
         const events = await EventData.find(query)
        .select('title description date type targetTeams createdAt') // Only select needed fields
        .sort({ date: 1 }) // Sort by date ascending (earliest first)
        .lean();
         res.status(200).json({
            success: true,
            count: events.length,
            data: events,
            user: {
                department: department,
                role: role
            }
            });
    }
    catch(err){
        console.error('Error fetching events:', err.message);
        res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to fetch events. Please try again later.'
        });

    }
}

// DELETE /api/events/:id
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.user;

    if (role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete events' });
    }

    const deleted = await EventData.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ message: 'Server error deleting event' });
  }
};

// PUT /api/events/:id
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.user;
    const { title, description, date, type, targetTeams } = req.body;

    if (role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update events' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (date !== undefined) {
      const newDate = new Date(date);
      if (isNaN(newDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
      }
      if (newDate.getDay() === 0) {
        return res.status(400).json({ message: 'Events cannot be on Sunday' });
      }
      updateData.date = newDate;
    }
    if (type !== undefined) {
      if (!['company_event', 'team_event'].includes(type)) {
        return res.status(400).json({ message: 'Invalid event type' });
      }
      updateData.type = type;
    }
    if (type === 'team_event' && targetTeams !== undefined) {
      const validTeams = ['developer', 'marketing', 'hr', 'finance', 'sales'];
      const invalid = targetTeams.filter(t => !validTeams.includes(t));
      if (invalid.length > 0) {
        return res.status(400).json({ message: `Invalid teams: ${invalid.join(', ')}` });
      }
      updateData.targetTeams = targetTeams;
    }

    const updatedEvent = await EventData.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent
    });
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// GET /api/events/today
export const getTodayEventas = async (req, res) => {
  try {
    const { department, role } = req.user;

    if (!department) {
      return res.status(400).json({ message: 'User department not set' });
    }

    // Calculate today's date range (00:00:00 to 23:59:59)
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // Build base query
    const baseQuery = {
      date: { $gte: start, $lte: end },
      ...(role !== 'admin' && {
        $or: [
          { type: 'company_event' },
          { type: 'team_event', targetTeams: { $in: [department] } }
        ]
      })
    };

    const events = await EventData.find(baseQuery)
      .select('title description date type targetTeams createdAt')
      .sort({ date: 1 })
      .lean();

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (err) {
    console.error('Fetch error:', err.message);
    res.status(500).json({ message: 'Error fetching today\'s events' });
  }
};
