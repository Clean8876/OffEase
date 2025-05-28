import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Container,
  Header,
  AddButton,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  Input,
  ButtonGroup,
  SaveButton,
  CancelButton,
} from "./EventManagement.styles";
import enUS from "date-fns/locale/en-US";
import EventCalendar from "../../../../Components/calender/Calender";
import axios from "axios";

const locales = {
  "en-US": enUS,
};


const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const eventTypes = ["team_event", "company_event"];
const teams = ['developer', 'marketing', 'hr', 'finance', 'sales'];
export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
   const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'team_event',
    targetTeams: [],
  });

  const handleAddEvent = async () => {
    try {
      if (newEvent.type === 'team_event' && newEvent.targetTeams.length === 0) {
    alert('Please select at least one team for team events');
    return;
  }
      // combine date+time → ISO
      const isoDate = new Date(`${newEvent.date}T${newEvent.time}`).toISOString();

      const payload = {
        title: newEvent.title,
        description: newEvent.description,
        date: isoDate,
        type: newEvent.type,
     
        targetTeams:  newEvent.targetTeams,
      };

      await axios.post(
        "http://localhost:5000/api/event/create-event",
        payload,
        {  headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        } }
        
      );
      

      // reset + close
      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        type: "team_event",
        targetTeam: [],
      });
      setShowModal(false);

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Container>
      <Header>
        <h2>Event Management</h2>
        <AddButton onClick={() => setShowModal(true)}>Add Event</AddButton>
      </Header>

      <EventCalendar/>

       {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Add New Event</ModalTitle>

            <Input
              placeholder="Title"
              value={newEvent.title}
              onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
            />

            <Input
              placeholder="Description"
              value={newEvent.description}
              onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
            />

            <Input
              type="date"
              value={newEvent.date}
              onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
            />

            <Input
              type="time"
              value={newEvent.time}
              onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
            />

            <label>Event Type:</label>
            <select
              value={newEvent.type}
              onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
            >
              {eventTypes.map(et => (
                <option key={et} value={et}>{et}</option>
              ))}
            </select>

           <label>Target Team:</label>
          <select
            multiple
            value={newEvent.targetTeams}
            onChange={(e) => {
              const selectedTeams = Array.from(e.target.selectedOptions, option => option.value);
              setNewEvent({ ...newEvent, targetTeams: selectedTeams });
            }}
            className="w-full p-2 border rounded-md" // Optional Tailwind styling
          >
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>

            <ButtonGroup>
              <SaveButton onClick={handleAddEvent}>Save</SaveButton>
              <CancelButton onClick={() => setShowModal(false)}>Cancel</CancelButton>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
