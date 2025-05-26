import React from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  Row,
  Label,
  Value,
  ActionButtons,
  ActionButton,
} from "./LeaveApprovalModal.styles";
import { updateStatus } from "../../../../api/LeaveRequestApi";

export default function LeaveApprovalModal({ leave, onClose, onUpdateStatus }) {
  if (!leave) return null; // Ensure we don't render the modal without data

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateStatus({
        requestId: leave._id,
        status: newStatus,
      });

      // Optionally notify parent or refresh list
      if (onUpdateStatus) {
        onUpdateStatus(leave._id, newStatus);
      }

      onClose();
    } catch (error) {
      console.error("Failed to update status:", error);
      // Optionally show error to user
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Leave Application Details</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Label>Full Name:</Label>
            <Value>
              {leave.employee?.Firstname} {leave.employee?.Lastname}
            </Value>
          </Row>
          <Row>
            <Label>Email:</Label>
            <Value>{leave.employee?.email}</Value>
          </Row>
          <Row>
            <Label>Department:</Label>
            <Value>{leave.employee?.department}</Value>
          </Row>
          <Row>
            <Label>Leave Type:</Label>
            <Value>{leave.leaveType?.name}</Value>
          </Row>
          <Row>
            <Label>Start Date:</Label>
            <Value>{new Date(leave.startDate).toLocaleDateString()}</Value>
          </Row>
          <Row>
            <Label>End Date:</Label>
            <Value>{new Date(leave.endDate).toLocaleDateString()}</Value>
          </Row>
          <Row>
            <Label>Reason:</Label>
            <Value>{leave.reason}</Value>
          </Row>
          <Row>
            <Label>Status:</Label>
            <Value>{leave.status}</Value>
          </Row>
          <Row>
            <Label>Leave Balances:</Label>
            <Value>
              Casual - Total: {leave.leaveBalances?.casual?.total || 0},
              Remaining: {leave.leaveBalances?.casual?.remaining || 0}
              <br />
              Sick - Total: {leave.leaveBalances?.sick?.total || 0}, Remaining:{" "}
              {leave.leaveBalances?.sick?.remaining || 0}
            </Value>
          </Row>

          {leave.status?.toLowerCase() === "pending" && (
            <ActionButtons>
              <ActionButton approve onClick={() => handleStatusUpdate("approved")}>
                Approve
              </ActionButton>
              <ActionButton reject onClick={() => handleStatusUpdate("rejected")}>
                Reject
              </ActionButton>
            </ActionButtons>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
}
