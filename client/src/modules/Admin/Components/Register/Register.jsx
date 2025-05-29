import React from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Typography,
  Modal,
} from 'antd';
import dayjs from 'dayjs';
import { register } from '../../../../api/AuthApi';
import {
  ModalWrapper,
  ModalTitle,
  ModalContent,
  FormRow
} from './Register.styles';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Title } = Typography;

const Register = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const nameRegex = /^[A-Za-z]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const onFinish = async (values) => {
    try {
      const payload = {
        Firstname: values.Firstname,
        Lastname: values.Lastname,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        dob: values.dob.format('YYYY-MM-DD'),
        department: values.department,
        role: values.role,
        profilePictureUrl: values.profilePictureUrl,
      };

      const response = await register(payload);
      console.log('Server Response:', response);
      toast.success('Employee registered successfully!');
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Registration Error:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  const onFinishFailed = ({ errorFields }) => {
    if (errorFields.length > 0) {
      toast.warn(errorFields[0].errors[0]);
    }
  };

  return (
    <>
      <Modal open={open} onCancel={onClose} footer={null} centered width={600}>
        <ModalWrapper>
          <ModalTitle level={3}>Register Employee</ModalTitle>
          <ModalContent>
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{ role: 'employee' }}
            >
              <FormRow>
                <Form.Item
                  name="Firstname"
                  label="First Name"
                  rules={[
                    { required: true, message: 'First name is required' },
                    {
                      pattern: nameRegex,
                      message: 'First name should contain only letters',
                    },
                  ]}
                >
                  <Input placeholder="Enter First Name" />
                </Form.Item>

                <Form.Item
                  name="Lastname"
                  label="Last Name"
                  rules={[
                    { required: true, message: 'Last name is required' },
                    {
                      pattern: nameRegex,
                      message: 'Last name should contain only letters',
                    },
                  ]}
                >
                  <Input placeholder="Enter Last Name" />
                </Form.Item>
              </FormRow>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Email is required' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder="Enter Email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Password is required' },
                  {
                    pattern: passwordRegex,
                    message:
                      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Enter Password" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>

              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[{ required: true, message: 'Date of birth is required' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>

              <FormRow>
                <Form.Item
                  name="department"
                  label="Department"
                  rules={[{ required: true, message: 'Please select a department' }]}
                >
                  <Select placeholder="Select Department">
                    <Select.Option value="developer">Developer</Select.Option>
                    <Select.Option value="marketing">Marketing</Select.Option>
                    <Select.Option value="hr">HR</Select.Option>
                    <Select.Option value="finance">Finance</Select.Option>
                    <Select.Option value="sales">Sales</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="role"
                  label="Role"
                  rules={[{ required: true, message: 'Please select a role' }]}
                >
                  <Select>
                    <Select.Option value="employee">Employee</Select.Option>
                    <Select.Option value="admin">Admin</Select.Option>
                  </Select>
                </Form.Item>
              </FormRow>

              <Form.Item
                name="profilePictureUrl"
                label="Profile Picture URL"
                rules={[{ required: true, message: 'Profile picture URL is required' }]}
              >
                <Input placeholder="Enter image URL" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </ModalContent>
        </ModalWrapper>
      </Modal>

      {/* Toast container to display toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Register;
