import React, { useState, useRef, useEffect } from 'react'; // Import useEffect
import { getUserById } from '../../../../api/AuthApi'; // Adjust path if needed
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
  // FixedCode,
  MobileNumberInput,
  // FileUploadContainer, // Commented out unused imports
  // UploadButton,
  // BrowseButton,
  // SaveButton,
  FlexRow
} from './Profile.styles';

import cameraIcon from '../../../../assets/Camera.png';
import defaultAvatar from '../../../../assets/profile.png';

const Profile = () => {
  const [profileData, setProfileData] = useState({
  fullName: '',
  email: '',
  employmentId: '', // 👈 Add this field
  designation: '',
  role: '',
  photo: '',
  idProof: ''
});


  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const profilePhotoInputRef = useRef(null);

  // --- Fetch User Data on Component Mount ---
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserById();
        console.log('Fetched user data:', userData.data); // Log to see the structure

        // Map the API response to your profileData state
       setProfileData({
  fullName: `${userData.data.Firstname || ''} ${userData.data.Lastname || ''}`.trim(),
  email: userData.data.email || '',
  employmentId: userData.data.employmentId || '', // 👈 Add this line
  designation: userData.data.department || '',
  role: userData.data.role || '',
  photo: userData.data.profilePictureUrl || '',
  idProof: ''
});


        // If a profile picture URL exists, use it
        if (userData.data.profilePictureUrl) {
          setProfileImage(userData.data.profilePictureUrl);
        }

      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle error, e.g., show a toast notification
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array means this runs once on mount

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
        // You might also want to set `profileData.photo` to the file or a URL for upload later
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Here you would typically send profileData to a backend API to save changes
    console.log('Saving changes:', profileData);
    // Example: call an update API like: await updateUserProfile(profileData);
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

      <Form onSubmit={handleSaveChanges}> {/* Add onSubmit handler */}
        <FlexRow>
          <InputGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullName"
              value={profileData.fullName}
              onChange={handleInputChange}
              readOnly 
            />
          </InputGroup>

          <InputGroup>
            <Label>EmployeeId</Label>
            <MobileInputContainer>
              {/* <FixedCode>+91</FixedCode>
              <div className="numberLine" /> */}
              <MobileNumberInput
                name="Id"
                value={profileData.employmentId}
                onChange={handleInputChange}
                readOnly
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
              readOnly 
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
              readOnly 
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
              readOnly
            />
          </InputGroup>
        </FlexRow>

        {/* ... (Your file upload section, if you want to keep it) */}

        {/* <SaveButton type="submit">Save Changes</SaveButton> Set type to submit */}
      </Form>
    </Container>
  );
};

export default Profile;