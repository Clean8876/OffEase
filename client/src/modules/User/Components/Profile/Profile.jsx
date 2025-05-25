import React, { useState, useRef } from 'react';
import {
  Container,
  AvatarSection,
  ProfileImage,
  CameraImage,
  Form,
  InputGroup,
  Label,
  Input,
  MobileInputContainer,
  FixedCode,
  MobileNumberInput,
  FileUploadContainer,
  UploadButton,
  BrowseButton,
  SaveButton,
  FlexRow
} from './Profile.styles';

import cameraIcon from '../../../../assets/Camera.png';
import defaultAvatar from '../../../../assets/profile.png';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'Ryan Kr',
    email: 'ryan142@gmail.com',
    mobile: '9374624931',
    designation: 'Developer',
    role: 'employee',
    photo: '',
    idProof: ''
  });

  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const profilePhotoInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePhotoUploadClick = () => {
    profilePhotoInputRef.current.click();
  };

  const handleProfilePhotoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  

  return (
    <Container>
      <AvatarSection>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <ProfileImage src={profileImage} alt="Profile" />
          <CameraImage
            src={cameraIcon}
            alt="Change"
            onClick={handleProfilePhotoUploadClick}
          />
          <input
            type="file"
            ref={profilePhotoInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleProfilePhotoFileChange}
          />
        </div>
      </AvatarSection>

      <Form>
        <FlexRow>
          <InputGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullName"
              value={profileData.fullName}
              onChange={handleInputChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>Mobile</Label>
            <MobileInputContainer>
              <FixedCode>+91</FixedCode>
              <div className="numberLine" />
              <MobileNumberInput
                name="mobile"
                value={profileData.mobile}
                onChange={handleInputChange}
              />
            </MobileInputContainer>
          </InputGroup>
        </FlexRow>

        <FlexRow>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
            />
          </InputGroup>
        </FlexRow>

        <FlexRow>
          <InputGroup>
            <Label>Designation</Label>
            <Input
              type="text"
              name="designation"
              value={profileData.designation}
              onChange={handleInputChange}
            />
          </InputGroup>
        </FlexRow>

        <FlexRow>
          <InputGroup>
            <Label>Role</Label>
            <Input
              type="text"
              name="role"
              value={profileData.role}
              onChange={handleInputChange}
            />
          </InputGroup>
        </FlexRow>

        <FlexRow>
          {/* <InputGroup>
            <Label>
              Upload Photo <small>(Passport Size)</small>
            </Label>
            <FileUploadContainer>
              <UploadButton>📤 Upload Document</UploadButton>
              <BrowseButton onClick={handleProfilePhotoUploadClick}>Browse</BrowseButton>
            </FileUploadContainer>
          </InputGroup> */}
        </FlexRow>

        <SaveButton>Save Changes</SaveButton>
      </Form>
    </Container>
  );
};

export default Profile;
