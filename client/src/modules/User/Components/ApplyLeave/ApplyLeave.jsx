import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {
  Container, LeaveSection, FormWrapper, Row, Label, Input, Select,
  TextArea, ButtonRow, Button, TableContainer, StyledTable, TableHeader, TableRow,
  TableCell, StatusBadge, ReasonAnddescription
} from "./ApplyLeave.styles";
import {
  submitLeaveRequest,
  getLeaveRequests
} from '../../../../api/LeaveRequestApi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';


const ApplyLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    leaveType: "",
    reason: "",
    description: ""
  });

  

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    if (selectedStartDate) {
      setFormData((prev) => ({
        ...prev,
        startDate: selectedStartDate.toISOString().split("T")[0],
      }));
    }
  }, [selectedStartDate]);

  useEffect(() => {
    if (selectedEndDate) {
      setFormData((prev) => ({
        ...prev,
        endDate: selectedEndDate.toISOString().split("T")[0],
      }));
    }
  }, [selectedEndDate]);

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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await submitLeaveRequest(formData);
    await fetchRequests();

    toast.success("Leave Request submitted successfully!");

    // Reset form
    setFormData({
      startDate: "",
      endDate: "",
      leaveType: "",
      reason: "",
      description: ""
    });
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    console.log("Leave Request submitted:", response);
  } 
catch (err) {
  const message = err.response?.data?.message || err.message;

 if (message.toLowerCase().includes("must apply")) {
  toast.error("You can apply for casual leave only if it is at least 7 days in advance.");
} else if (message.toLowerCase().includes("insufficient")) {
  toast.error(message); 
} else {
  toast.error("Failed to submit leave request.");
}


  }
};



  return (
    <Container>
      {/* <Heading>Apply Leave</Heading> */}
      <ToastContainer position="top-center" autoClose={3000} />

      <LeaveSection>
        <FormWrapper>
          <form onSubmit={handleSubmit}>
            <Row>
              <Label>
                Start Date<span>*</span>
                <Calendar
                  onChange={setSelectedStartDate}
                  value={selectedStartDate}
                  tileDisabled={({ date }) => {
                    const today = new Date();
                    return (
                      date < new Date(today.setHours(0, 0, 0, 0)) ||
                      date.getDay() === 0 // Sunday
                    );
                  }}
                />
              </Label>

              <Label>
                End Date<span>*</span>
                <Calendar
                  onChange={setSelectedEndDate}
                  value={selectedEndDate}
                  tileDisabled={({ date }) => {
                    const today = new Date();
                    return (
                      date < new Date(today.setHours(0, 0, 0, 0)) ||
                      date.getDay() === 0
                    );
                  }}
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
                  <option value="select">Select</option>
                  <option value="casual">Casual Leave</option>
                  <option value="sick">Sick Leave</option>

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

            <ReasonAnddescription>
              <Label>
                Reason<span>*</span>
                <Input
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                />
              </Label>

              <Label>
                Description<span>*</span>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
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

// Exclude Sundays and past dates
const calculateDays = (start, end) => {
  if (!start || !end) return 0;
  let count = 0;
  let current = new Date(start);
  const endDate = new Date(end);

  while (current <= endDate) {
    const day = current.getDay(); // 0 = Sunday
    if (day !== 0) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
};

export default ApplyLeave;
