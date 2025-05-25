import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

export const ContentWrapper = styled.main`
  flex: 1;
  display: flex;
  //  width: calc(100% - 410px); 
 
  @media (max-width: 990px) {
  // margin-left: 200px;
  // max-width: calc(100% - 240px); /* Adjust based on sidebar width */
  }

  @media (max-width: 768px) {
    margin-left: 0; /* Remove margin on smaller screens */
    max-width: 100%; /* Adjust width for smaller screens */
    padding: 0px; /* Adjust padding for smaller screens */
  }
`;