import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border-radius: 12px;
  padding: 16px 32px 0 32px;
  font-family: "Arial", sans-serif;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    margin-left: 10px;
    margin-top: 0;
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #000;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-left: 0;
  }
`;

export const SortByContainer = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 12px;
`;

export const SortLabel = styled.span`
  margin-right: 4px;
`;

export const SortSelect = styled.select`
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  padding: 4px;
  font-family: "Arial", sans-serif;
  font-size: 12px;
  color: #555;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  background-color: #f9f9f9;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
`;

export const TableHead = styled.thead`
  background-color:rgb(238, 218, 237);
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 16px;
  font-family: "Arial", sans-serif;
  font-size: 16px;
  font-weight: normal;
  color: #555;
  white-space: nowrap;

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:hover {
    background-color: #eccfea;
  }
`;

export const TableCell = styled.td`
  padding: 15px;
  font-size: 14px;
  color: #000;
  white-space: nowrap;
  border-bottom: 1px solid #ccc;

  a {
    margin-left: 6px;
    text-decoration: none;
    color: #007bff;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;

  svg {
    cursor: pointer;
    color: #666;
    transition: color 0.2s ease;

    &:hover {
      color: #007bff;
    }
  }
`;

export const PageInfo = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

export const PageButton = styled.button`
  border: 1px solid #ccc;
  background-color: #fff;
  color: #666;
  font-size: 0.9rem;
  padding: 4px 8px;
  cursor: pointer;

  &.active {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
  }

  &:hover {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 0;
  margin-top: 16px;

  @media (max-width: 768px) {
    margin: 10px 5px;
  }

  @media (max-width: 480px) {
    margin: 10px 5px;
  }
`;

export const CreateButton = styled.button`
  padding: 16px;
  background: linear-gradient(to right, #0dcaf0, #007bff);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-family: "Arial", sans-serif;
  cursor: pointer;
  font-size: 1rem;
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;

  @media (max-width: 768px) {
    font-size: 12px;
    width: 40%;
    margin-right: 20px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 10px;
    width: 50%;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 5px 10px 40px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: #999;
  background: #f0f0f0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SecondHero = styled.div`
display: flex;
flex-direction: row;
// padding: 20px;
width: 100%;
@media (max-width: 576px) {
  flex-direction: column-reverse;
}
`;

export const DepartmentFilter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
  @media (max-width: 576px) {
    align-items: flex-start;
    margin: 0;
    margin-bottom: 20px;
  }
  
`;
