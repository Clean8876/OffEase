import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  font-family: Arial, sans-serif;
  width: 90%;
  margin: 0 auto;

  @media (max-width: 576px) {
   width: 100%;
  }
`;

export const LeaveSection = styled.div`
  display: flex;
  gap: 2rem;
`;

export const BalanceContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  font-family: sans-serif;
  font-size: 14px;
`;

export const Labeling = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const LeaveType = styled.span`
  margin-right: 15px;
`;

export const LeaveValue = styled.span`
  color: #e53935; /* red color from image */
  font-weight: 500;
`;

export const CalendarSection = styled.div`
  flex: 1;
  // width: 30%;
`;

export const CalendarWrapper = styled.div`
  .react-calendar {
    width: 100%;
    height: 100%;
    // border: none;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    border: 1px solid #d9d9d9;
  }

  .react-calendar__tile {
    padding: 10px 6.6667px;
  }

  .react-calendar__month-view__days {
    height: 200px; /* Adjust height */
  }
`;


export const FormSection = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.3rem;


  .react-calendar {
    width: 350px;
    height: 100%;
    border: none;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;

    @media (max-width: 935px) {
      width: 250px;

    }

    @media (max-width: 768px) {
      width: 80%;
      margin: 0 auto;
      
    }

    @media (max-width: 576px) {
      width: 100%;
      margin: 0 auto;
    }
  }

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 1rem;
  }

    @media (max-width: 576px) {
      text-align: left;
      margin-bottom: 1rem;
    }
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
`;

export const StyledSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;


export const Heading = styled.h2`
  margin-bottom: 1rem;
`;




//////////////////////

// import styled from "styled-components";

export const FormWrapper = styled.div`
display: flex;
flex-direction: column;
  border: 1px solid #d9d9d9;
  padding: 1.5rem;
  background: #f9fdfc;
  border-radius: 8px;
  width: 100%;
  gap: 2rem;
  // margin: auto;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.2rem;

  @media (max-width: 768px) {
   justify-content: center;
  }



  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const ReasonAnddescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Select = styled.select`
  padding: 6px 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  padding: 6px 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  width: 100%;
  box-sizing: border-box;
`;

export const UploadHeader = styled.div`
  margin-top: 1.5rem;
  font-weight: 600;
  font-size: 15px;
`;

export const UploadBox = styled.div`
  border: 1px dashed #e47438;
  background-color: #f4fdfc;
  padding: 20px;
  text-align: center;
  border-radius: 6px;
  margin-top: 0.5rem;
`;

export const UploadText = styled.div`
  color: #777;
  font-style: italic;
`;

export const UploadNote = styled.div`
  font-size: 12px;
  color: #555;
  margin-top: 8px;
`;

export const AddAnotherLeave = styled.div`
  margin-top: 1rem;
  color: #0077cc;
  font-weight: 600;
  cursor: pointer;
`;

export const InfoText = styled.p`
  margin-top: 0.5rem;
  font-size: 12px;
  color: #888;
`;

export const ButtonRow = styled.div`
display: flex;
justify-content: flex-end;
  gap: 1rem;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  background-color: ${(props) => props.bg || "#fff"};
  color: ${(props) => (props.bg === "#fff" ? "#1976d2" : "#fff")};
  border: ${(props) => (props.border ? "1px solid #1976d2" : "none")};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const TableContainer = styled.div`
  margin-top: 20px;
  overflow-x: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

export const TableHeader = styled.th`
  background-color: #f4f4f4;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

export const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  background-color: ${({ status }) =>
    status === "approved"
      ? "#4caf50"
      : status === "rejected"
      ? "#f44336"
      : "#ff9800"};
  text-transform: capitalize;
`;