import styled from 'styled-components';
import { Typography } from 'antd';

export const ModalWrapper = styled.div`
  padding: 1rem;
`;

export const ModalTitle = styled(Typography.Title)`
  text-align: center !important;
  margin-bottom: 1.5rem !important;
`;

export const ModalContent = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 8px;
`;

export const FormRow = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  margin-bottom: 1rem;


.ant-form-item.css-dev-only-do-not-override-vrrzze {
    width: 100%;
}
`;