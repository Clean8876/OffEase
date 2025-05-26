import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  width: 500px;
  padding: 20px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  margin: 0;
`;

export const CloseButton = styled.button`
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
`;

export const ModalBody = styled.div`
  margin-top: 20px;
`;

export const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const Label = styled.div`
  width: 150px;
  font-weight: bold;
`;

export const Value = styled.div`
  flex: 1;
`;


export const ActionButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  background-color: ${props => props.approve ? "#28a745" : props.reject ? "#dc3545" : "#007bff"};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.approve ? "#218838" : props.reject ? "#c82333" : "#0056b3"};
  }
`;