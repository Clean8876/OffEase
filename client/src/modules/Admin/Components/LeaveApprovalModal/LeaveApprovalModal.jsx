import React, { useEffect, useState } from "react";
import {
  ModalTitle,
  ModalBody,
  Row,
  Label,
  Value,
  ActionButtons,
  ActionButton,
  LeaveContainer,
  CurrectDate,
  TodayDate,
  Heading,
  MainBody,
  Dates,
  Status,
  Name,
  BackTitle,
  BackIcon,
} from "./LeaveApprovalModal.styles";
import { useParams } from "react-router-dom";
import { getAllLeaves, updateStatus } from "../../../../api/LeaveRequestApi";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function LeaveApprovalModal() {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const allLeaves = await getAllLeaves();
        const selectedLeave = allLeaves.find((leave) => leave._id === id);
        setLeave(selectedLeave || null);
      } catch (error) {
        console.error("Error fetching leave:", error);
      }
    };

    if (id) {
      fetchLeave();
    }
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateStatus({
        requestId: leave._id,
        status: newStatus,
      });

      setLeave((prev) => ({
        ...prev,
        status: newStatus,
      }));

      // Optional: close modal or notify parent
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!leave) return null;

  const calculateLeaveDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInMs = endDate - startDate;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1; // Include both start & end
    return diffInDays;
  };

  const leaveDays = calculateLeaveDays(leave.startDate, leave.endDate);
  const leaveType = leave.leaveType?.name?.toLowerCase();

  let isOverLimit = false;
  if (leaveType === "sick" && leaveDays > 2) {
    isOverLimit = true;
  }
  if (leaveType === "casual" && leaveDays > 4) {
    isOverLimit = true;
  }

  

  return (
    <ModalBody>
      <BackTitle>
        <BackIcon onClick={() => navigate(-1)}>
          <IoArrowBack />
        </BackIcon>
        <ModalTitle>Leave Request Details</ModalTitle>
      </BackTitle>

      <LeaveContainer>
        <CurrectDate>
          <TodayDate>{formatDate(leave.createdAt)}</TodayDate>
        </CurrectDate>
        <Heading>
          <Name>
            <Row>
              {/* <Label>Full Name:</Label> */}
              <Value style={{ fontSize: "16px", fontWeight: "bold" }}>
                {leave.employee?.Firstname ?? "N/A"}{" "}
                {leave.employee?.Lastname ?? ""}
              </Value>
            </Row>

            <Row>
              <Label>Leave Status:</Label>
              <Status>{leave.status ?? "N/A"}</Status>
            </Row>
          </Name>
          <Row>
            {/* <Label>Email:</Label> */}
            <Value>{leave.employee?.email ?? "N/A"}</Value>
          </Row>
          <Row>
            {/* <Label>Department:</Label> */}
            <Value>{leave.employee?.department ?? "N/A"}</Value>
          </Row>
        </Heading>

        <Dates>
          <Row>
            <Label>Start Date:</Label>
            <Value>{formatDate(leave.startDate)}</Value>
          </Row>
          <Row>
            <Label>End Date:</Label>
            <Value>{formatDate(leave.endDate)}</Value>
          </Row>
          <Row>
            <Label>No of Days:</Label>
            <Value>{leaveDays}</Value>
          </Row>
        </Dates>

        <MainBody>
          <Row>
            <Label>Leave Type:</Label>
            <Value>{leave.leaveType?.name ?? "N/A"}</Value>
          </Row>

          <Row>
            <Label>Reason:</Label>
            <Value>{leave.reason ?? "N/A"}</Value>
          </Row>

          <Row>
            <Label>Description</Label>
            <Value>{leave.description ?? "N/A"}</Value>
          </Row>
        </MainBody>

        <Row>
          <Label>Remaining Casual Leaves : </Label>
          <Value>{leave.leaveBalances?.casual?.remaining ?? 0}</Value>
        </Row>

        <Row>
          <Label>Remaining Sick Leaves : </Label>
          <Value>{leave.leaveBalances?.sick?.remaining ?? 0}</Value>
        </Row>

        {leave.status?.toLowerCase() === "pending" && (
          <ActionButtons>
            <ActionButton
              approve
              disabled={isOverLimit}
              title={isOverLimit ? "Leave duration exceeds allowed limit" : ""}
              onClick={() => handleStatusUpdate("approved")}
            >
              Approve
            </ActionButton>

            <ActionButton reject onClick={() => handleStatusUpdate("rejected")}>
              Reject
            </ActionButton>
          </ActionButtons>
        )}
      </LeaveContainer>
    </ModalBody>
  );
}
