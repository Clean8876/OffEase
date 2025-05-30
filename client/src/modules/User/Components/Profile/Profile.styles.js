import styled from 'styled-components';

export const Container = styled.div`
  width: 80%;
  margin: 40px auto;
  padding: 32px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    width: 100%;
    box-shadow: none;
    padding: 16px;
    margin: 0;
  }
`;

export const AvatarSection = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ccc;
`;

export const CameraImage = styled.img`
  width: 28px;
  height: 28px;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
  background-color: #fff;
  border-radius: 50%;
  padding: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FlexRow = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const InputGroup = styled.div`
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;

  small {
    font-weight: normal;
    color: #777;
    font-size: 12px;
  }
`;

export const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export const MobileInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0 12px;
`;

export const FixedCode = styled.span`
  font-size: 14px;
  color: #333;
`;

export const MobileNumberInput = styled.input`
  flex: 1;
  border: none;
  padding: 10px 0;
  font-size: 14px;
  outline: none;
`;

export const FileUploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UploadButton = styled.div`
  font-size: 14px;
  color: #007bff;
  display: flex;
  align-items: center;
  cursor: default;
`;

export const BrowseButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const SaveButton = styled.button`
  margin-top: 24px;
  align-self: flex-end;
  background-color: #28a745;
  color: #fff;
  padding: 12px 24px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;
