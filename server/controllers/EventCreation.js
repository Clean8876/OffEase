import EventData from "../models/EventSchmea.js";



export const createEvent = async (req, res) =>{
    try {
        const { role, team, id: userId } = req.user;
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