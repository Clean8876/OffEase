import styled from "styled-components";
export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const CloseButton = styled.button`
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
`;

export const ModalBody = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-right: 20px;
  
`;

export const Value = styled.p`
    // background-color: #f5f5f5; 
  border-radius: 6px;

  // box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  box-sizing: border-box;
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
export const LeaveContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CurrectDate = styled.div`
display: flex;
justify-content: flex-end;
margin-bottom: 20px;
`;

export const TodayDate = styled.p`
margin-right: 10px;
font-weight: 400;
`;

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  // align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 30px;

`;

export const Dates = styled.div`
  display: flex;
  gap: 50px;
`;

export const Name = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Status = styled.p`
padding: 10px;
// border: 1px solid rgb(144, 255, 153);
border-radius: 6px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
font-weight: 600;
font-size: 16px;
margin-right: 10px;
`;

export const LetterContainer = styled.div`
  font-family: 'Georgia', serif;
  line-height: 1.6;
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
`;

export const Paragraph = styled.p`
  margin-bottom: 16px;
  font-size: 16px;
`;

export const Salutation = styled.p`
  font-weight: 500;
  margin-bottom: 12px;
`;

export const Signature = styled.div`
  margin-top: 30px;
  font-weight: bold;
`;

export const SubjectLine = styled.p`
  font-weight: bold;
  margin: 10px 0;
  text-decoration: underline;
`;

export const BackTitle = styled.div`
display: flex;
gap: 20px;
align-items: center;
`;

export const BackIcon = styled.div`
font-size: 1.5rem;
cursor: pointer;
`;



