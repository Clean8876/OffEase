import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

export const ContentWrapper = styled.main`
  flex: 1;
  padding: 10px 20px;
  margin-left: 250px; /* This should match your sidebar width */
  max-width: calc(100% - 250px);
  background-color: #f0f2f5; /* Replace with your actual background color */

  @media (max-width: 990px) {
    margin-left: 200px;
    max-width: calc(100% - 240px);
  }

  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 100%;
    padding: 0px;
  }
`;
