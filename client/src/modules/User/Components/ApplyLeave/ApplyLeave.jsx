import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {
  Container,
  LeaveSection,
  CalendarSection,
  BalanceContainer,
  Labeling,
  LeaveType,
  LeaveValue,
  CalendarWrapper,
  Heading,
  FormWrapper,
  Row,
  Label,
  Input,
  Select,
  TextArea,
  ButtonRow,
  Button,
  TableContainer,
  StyledTable,
  TableHeader,
  TableRow,
  TableCell,
  StatusBadge,
} from "./ApplyLeave.styles";

const ApplyLeave = ({ leaveData = [] }) => {
  // Use local state for leave requests to update the table dynamically.
  const [leaves, setLeaves] = useState(leaveData);

  const remainingleave = {
  CL: 0.75,
  SL: 2.83,
  EL: 8.52,
  FL: 2,
};

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    leaveType: "",
    reason: "",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Build a new leave request object. Status here is assumed "pending"
    const newLeave = {
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      noOfDays: calculateDays(formData.startDate, formData.endDate),
      status: "pending",
    };

    // Update state so the new leave appears on the table.
    setLeaves([...leaves, newLeave]);

    // Optionally, reset the form
    setFormData({
      startDate: "",
      endDate: "",
      leaveType: "",
      reason: "",
    });
  };

  return (
    <Container>
      <Heading>Apply Leave</Heading>
      <LeaveSection>
        <CalendarSection>
            <BalanceContainer>
      <Labeling>Available Leave Balance:</Labeling>
      {Object.entries(remainingleave).map(([type, value]) => (
        <LeaveType key={type}>
          {type}: <LeaveValue>{value}</LeaveValue>
        </LeaveType>
      ))}
    </BalanceContainer>
          <CalendarWrapper>
            <Calendar onChange={setSelectedDate} value={selectedDate} />
          </CalendarWrapper>
        </CalendarSection>

        <FormWrapper>
          {/* Wrap the form elements in a form element */}
          <form onSubmit={handleSubmit}>
            <Row>
              <Label>
                Start Date<span>*</span>
                <Input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </Label>
              <Label>
                End Date<span>*</span>
                <Input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </Label>
              <Label>
                Leave Type<span>*</span>
                <Select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                </Select>
              </Label>
              <Label>
                No. of Days
                <Input
                  type="number"
                  value={calculateDays(formData.startDate, formData.endDate)}
                  disabled
                />
              </Label>
            </Row>

            <Label>
              Detailed Reason<span>*</span>
              <TextArea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                rows={8}
                required
              />
            </Label>

            <ButtonRow>
              <Button type="submit" bg="#1976d2">
                Submit
              </Button>
            </ButtonRow>
          </form>
        </FormWrapper>
      </LeaveSection>

      <TableContainer>
        <StyledTable>
          <thead>
            <TableRow>
              <TableHeader>Leave Type</TableHeader>
              <TableHeader>Start Date</TableHeader>
              <TableHeader>End Date</TableHeader>
              <TableHeader>No. of Days</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {leaves.map((leave, index) => (
              <TableRow key={index}>
                <TableCell>{leave.leaveType}</TableCell>
                <TableCell>{leave.startDate}</TableCell>
                <TableCell>{leave.endDate}</TableCell>
                <TableCell>{leave.noOfDays}</TableCell>
                <TableCell>
                  <StatusBadge status={leave.status}>{leave.status}</StatusBadge>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </Container>
  );
};

const calculateDays = (start, end) => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  return diff > 0 ? diff : 0;
};

export default ApplyLeave;
