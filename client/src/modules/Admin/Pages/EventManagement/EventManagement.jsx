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

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
  });

  const handleAddEvent = () => {
    const { title, date, time } = newEvent;
    if (!title || !date || !time) return;

    const startDate = new Date(`${date}T${time}`);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1-hour event

    setEvents([...events, { title, start: startDate, end: endDate }]);
    setNewEvent({ title: "", date: "", time: "" });
    setShowModal(false);
  };

  return (
    <Container>
      <Header>
        <h2>Event Management</h2>
        <AddButton onClick={() => setShowModal(true)}>Add Event</AddButton>
      </Header>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 70px)" }}
      />

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Add New Event</ModalTitle>
            <Input
              placeholder="Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <Input
              type="date"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
            />
            <Input
              type="time"
              value={newEvent.time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, time: e.target.value })
              }
            />
            <ButtonGroup>
              <SaveButton onClick={handleAddEvent}>Save</SaveButton>
              <CancelButton onClick={() => setShowModal(false)}>
                Cancel
              </CancelButton>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
