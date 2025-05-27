import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {
  Container, LeaveSection, Heading, FormWrapper, Row, Label, Input, Select,
  TextArea, ButtonRow, Button, TableContainer, StyledTable, TableHeader, TableRow,
  TableCell, StatusBadge, ReasonAnddescription
} from "./ApplyLeave.styles";
import {
  submitLeaveRequest,
  getLeaveBalances,
  getLeaveRequests
} from '../../../../api/LeaveRequestApi';

const ApplyLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [remainingleave, setRemainingLeave] = useState({});
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    leaveType: "",
    reason: "",
    description: ""
  });

  useEffect(() => {
    fetchBalances();
    fetchRequests();
  }, []);

  const fetchBalances = async () => {
    try {
      const balances = await getLeaveBalances();
      const mapped = {};
      balances.forEach(b => {
        mapped[b.leaveType.name] = b.remainingDays;
      });
      setRemainingLeave(mapped);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const data = await getLeaveRequests();
      setLeaves(data.map(req => ({
        leaveType: req.leaveType.name,
        startDate: req.startDate,
        endDate: req.endDate,
        noOfDays: calculateDays(req.startDate, req.endDate),
        status: req.status
      })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitLeaveRequest(formData);
      await fetchBalances();
      await fetchRequests();
      setFormData({ startDate: "", endDate: "", leaveType: "", reason: "", description: "" });
      console.log("Leave Request submitted:", response);
      return response;
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <Heading>Apply Leave</Heading>
      <LeaveSection>
        {/* <CalendarSection> */}
          

          {/* <CalendarWrapper>
    <Calendar onChange={setSelectedDate} value={selectedDate} />
  </CalendarWrapper> */}
        {/* </CalendarSection> */}


        <FormWrapper>
          <form onSubmit={handleSubmit}>
            <Row>
              <Label>
                Start Date<span>*</span>
                <Input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
              </Label>
              <Label>
                End Date<span>*</span>
                <Input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required />
              </Label>
              <Label>
                Leave Type<span>*</span>
                <Select name="leaveType" value={formData.leaveType} onChange={handleInputChange} required>
                  <option value="select">Select</option>
                  <option value="sick">Sick Leave</option>
                  <option value="casual">Casual Leave</option>
                </Select>
              </Label>
              <Label>
                No. of Days
                <Input type="number" value={calculateDays(formData.startDate, formData.endDate)} disabled />
              </Label>
            </Row>
            <ReasonAnddescription>
              <Label>
                Reason<span>*</span>
                <Input name="reason" value={formData.reason} onChange={handleInputChange} required />
              </Label>
              <Label>
                Description<span>*</span>
                <TextArea name="description" value={formData.description} onChange={handleInputChange} rows={6} required />
              </Label>

            </ReasonAnddescription>
            <ButtonRow>
              <Button type="submit" bg="#1976d2">Submit</Button>
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
                <TableCell><StatusBadge status={leave.status}>{leave.status}</StatusBadge></TableCell>
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