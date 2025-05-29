import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Calendar, X } from 'lucide-react';
import axios from 'axios';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [eventsForDay, setEventsForDay] = useState([]);

  // Memoized fetch events function
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('https://off-ease.vercel.app/api/event/get-event', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const filterEvents = (events, user) => {
        const now = new Date();
        return events.filter(event => {
          const eventDate = new Date(event.date);
          if (eventDate < now) return false;
          
          return user.role === 'admin' ||
            event.type === 'company_event' ||
            (event.type === 'team_event' &&
            event.targetTeams.includes(user.department));
        });
      };

      const filteredEvents = filterEvents(data.data, data.user);
      
      const eventsWithDates = filteredEvents.map(event => ({
        ...event,
        date: new Date(event.date)
      }));

      setEvents(eventsWithDates);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch events. Please try again later.');
      setLoading(false);
      console.error('Error fetching events:', err);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Memoized calendar calculations
  const { daysInMonth, firstDay, monthYear, hasEventsInMonth } = useMemo(() => {
    const daysInMonth = new Date(
      currentDate.getFullYear(), 
      currentDate.getMonth() + 1, 
      0
    ).getDate();
    
    const firstDay = new Date(
      currentDate.getFullYear(), 
      currentDate.getMonth(), 
      1
    ).getDay();
    
    const monthYear = currentDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });

    // Check if there are any events in the current month
    const hasEventsInMonth = events.some(event => 
      event.date.getFullYear() === currentDate.getFullYear() && 
      event.date.getMonth() === currentDate.getMonth()
    );

    return { daysInMonth, firstDay, monthYear, hasEventsInMonth };
  }, [currentDate, events]);

  // Memoized navigation function
const navigateMonth = useCallback((direction) => {
  setCurrentDate(prev => {
    const newDate = new Date(prev);
    newDate.setMonth(prev.getMonth() + direction);
    return newDate;
  });
}, []);

  // Memoized function to get events for a specific date
  const getEventsForDate = useCallback((day) => {
    const dateToCheck = new Date(
      currentDate.getFullYear(), 
      currentDate.getMonth(), 
      day
    );
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === dateToCheck.getFullYear() &&
        eventDate.getMonth() === dateToCheck.getMonth() &&
        eventDate.getDate() === dateToCheck.getDate()
      );
    });
  }, [currentDate, events]);

  const formatTime = useCallback((date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }, []);

  const isToday = useCallback((day) => {
    const today = new Date();
    const dateToCheck = new Date(
      currentDate.getFullYear(), 
      currentDate.getMonth(), 
      day
    );
    return (
      dateToCheck.getFullYear() === today.getFullYear() &&
      dateToCheck.getMonth() === today.getMonth() &&
      dateToCheck.getDate() === today.getDate()
    );
  }, [currentDate]);

  const handleEventClick = useCallback((event, allEvents = false) => {
    if (allEvents) {
      setEventsForDay(event);
      setShowAllEvents(true);
    } else {
      setSelectedEvent(event);
    }
  }, []);

  const closeModal = useCallback(() => {
    setSelectedEvent(null);
    setShowAllEvents(false);
  }, []);

  // Memoized calendar days rendering
const renderCalendarDays = useMemo(() => {
  const days = [];

  const totalCells = 42; // 7 columns x 6 rows
  const emptyStartCells = firstDay;
  const totalDaysFilled = emptyStartCells + daysInMonth;

  // Empty cells before first day
  for (let i = 0; i < emptyStartCells; i++) {
    days.push(<div key={`empty-start-${i}`} className="h-24 border border-gray-200 bg-gray-50" />);
  }

  // Days with actual dates
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getEventsForDate(day);
    const isCurrentDay = isToday(day);

  days.push(
  <div 
    key={day} 
    className={`h-32 border border-gray-200 p-1 overflow-hidden relative transition-all ${
      isCurrentDay ? 'bg-blue-50 border-blue-300' : 'bg-white'
    } ${dayEvents.length > 0 ? 'hover:bg-gray-50' : ''}`}
  >
    <div className={`text-sm font-medium ${
      isCurrentDay ? 'text-blue-600' : 'text-gray-700'
    }`}>
      {day}
    </div>

    {/* Event Preview List */}
    <div className="absolute inset-x-1 bottom-1 space-y-1">
      {dayEvents.slice(0, 2).map(event => (
        <div
          key={event._id}
          onClick={() => handleEventClick(event)}
          className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate cursor-pointer hover:bg-blue-200"
          title={`${event.title} - ${formatTime(event.date)}`}
        >
          {formatTime(event.date)} {event.title}
        </div>
      ))}
      {dayEvents.length > 2 && (
        <div 
          className="text-xs text-gray-500 cursor-pointer hover:text-gray-700"
          onClick={() => handleEventClick(dayEvents, true)}
        >
          +{dayEvents.length - 2} more
        </div>
      )}
    </div>
  </div>
);
  }

  // Empty cells after the last day
  const remainingCells = totalCells - totalDaysFilled;
  for (let i = 0; i < remainingCells; i++) {
    days.push(<div key={`empty-end-${i}`} className="h-24 border border-gray-200 bg-gray-50" />);
  }

  return days;
}, [firstDay, daysInMonth, getEventsForDate, isToday, formatTime, handleEventClick]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading calendar...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-800">Events Calendar</h1>
        </div>
        
     <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <h2 className="text-lg sm:text-xl font-medium text-gray-700 text-center px-2">
            {monthYear}
          </h2>

          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
  {/* Day Headers */}
  <div className="grid grid-cols-7 bg-gray-50">
    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
      <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 border-r border-gray-200 last:border-r-0">
        {day}
      </div>
    ))}
  </div>

  {/* Calendar Days */}
  <div className="grid grid-cols-7 grid-rows-6">
    {renderCalendarDays}
  </div>
</div>

      {/* Legend */}
      <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-100 rounded"></div>
          <span>Events</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-50 border border-blue-300 rounded"></div>
          <span>Today</span>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{selectedEvent.title}</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Date & Time</p>
                  <p className="text-gray-800">
                    {selectedEvent.date.toLocaleDateString()} at {formatTime(selectedEvent.date)}
                  </p>
                </div>
                
                {selectedEvent.description && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="text-gray-800 whitespace-pre-line">{selectedEvent.description}</p>
                  </div>
                )}
                
                {selectedEvent.location && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-gray-800">{selectedEvent.location}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Event Type</p>
                  <p className="text-gray-800 capitalize">
                    {selectedEvent.type.replace('_', ' ')}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Events for Day Modal */}
      {showAllEvents && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  All Events on {eventsForDay[0].date.toLocaleDateString()}
                </h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {eventsForDay.map(event => (
                  <div 
                    key={event._id}
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowAllEvents(false);
                    }}
                    className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <div className="font-medium text-gray-800">{event.title}</div>
                    <div className="text-sm text-gray-600">
                      {formatTime(event.date)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;