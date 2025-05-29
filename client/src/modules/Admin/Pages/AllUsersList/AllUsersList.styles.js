import styled from "styled-components";

const breakpoints = {
  sm: "480px",
  md: "768px",
};

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border-radius: 12px;
  padding: 16px 32px 0 32px;
  font-family: "Arial", sans-serif;
  background-color: #f9f9f9;

  @media (max-width: ${breakpoints.md}) {
    margin: 10px;
    padding: 12px;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 8px;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
  }


`;

export const Title = styled.h3`
  margin: 0;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 700;
  color: #000;
`;

export const SortByContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: #666;
`;

export const SortLabel = styled.span`
  margin-right: 4px;
`;

export const SortSelect = styled.select`
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  padding: 4px;
  font-family: "Arial", sans-serif;
  font-size: 0.75rem;
  color: #555;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
`;

export const TableHead = styled.thead`
  background-color: rgb(238, 218, 237);
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 16px;
  font-size: 1rem;
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
  font-size: 0.875rem;
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
  font-size: 0.875rem;
  color: #666;
`;

export const PageButton = styled.button`
  border: 1px solid #ccc;
  background-color: #fff;
  color: #666;
  font-size: 0.875rem;
  padding: 4px 8px;
  cursor: pointer;
  transition: 0.2s;

  &.active,
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
  margin-top: 16px;

  @media (max-width: ${breakpoints.md}) {
    justify-content: center;
    margin: 10px 0;
  }
`;

export const CreateButton = styled.button`
  padding: 12px 20px;
  background: linear-gradient(to right, #0dcaf0, #007bff);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-family: "Arial", sans-serif;
  cursor: pointer;
  font-size: 1rem;
  min-width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  @media (max-width: ${breakpoints.sm}) {
  width: 100%;
}


  @media (max-width: ${breakpoints.md}) {
    font-size: 0.75rem;
    padding: 10px 16px;
    min-width: 100px;
  }

  @media (max-width: ${breakpoints.sm}) {
    width: 100%;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 16px;
  width: 100%;
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
  padding: 10px 10px 10px 40px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background: #f0f0f0;

  &:focus {
    outline: 2px solid #007bff;
  }
    @media (max-width: ${breakpoints.sm}) {
  font-size: 0.875rem;
  padding: 8px 8px 8px 36px;
}

`;

export const SecondHero = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  @media (max-width: 576px) {
    flex-direction: column-reverse;
    

  }
`;

export const DepartmentFilter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;

  @media (max-width: ${breakpoints.sm}) {
    margin: 0;
    width: 100%;
    align-items: flex-start;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  @media (max-width: ${breakpoints.sm}) {
  width: 90%;
  padding: 16px;
}

`;

export const ModalTitle = styled.h3`
  margin-bottom: 12px;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const CancelButton = styled.button`
  padding: 8px 16px;
  background: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  padding: 8px 16px;
  background: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;