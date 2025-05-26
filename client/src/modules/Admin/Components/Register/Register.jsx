import React from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Typography,
  Modal,
  message,
} from 'antd';
import dayjs from 'dayjs';
import { register } from '../../../../api/AuthApi';
import {
  ModalWrapper,
  ModalTitle,
  ModalContent,
  FormRow
} from './Register.styles'; // Styled-components file

const { Title } = Typography;

const Register = ({ open, onClose }) => {
  const [form] = Form.useForm();

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
      message.success('Employee registered successfully!');
      form.resetFields();
      onClose(); // Close modal on success
    } catch (error) {
      console.error('Registration Error:', error);
      message.error('Registration failed. Please try again.');
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
    >
      <ModalWrapper>
        <ModalTitle level={3}>Register Employee</ModalTitle>
        <ModalContent>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={{ role: 'employee' }}
          >
            <FormRow>
            <Form.Item name="Firstname" label="First Name" rules={[{ required: true }]}>
              <Input placeholder="Enter First Name" />
            </Form.Item>

            <Form.Item name="Lastname" label="Last Name" rules={[{ required: true }]}>
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
              rules={[{ required: true, message: 'Password is required' }]}
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

            <Form.Item name="dob" label="Date of Birth" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <FormRow>

            <Form.Item name="department" label="Department" rules={[{ required: true }]}>
              <Select placeholder="Select Department">
                <Select.Option value="developer">Developer</Select.Option>
                <Select.Option value="marketing">Marketing</Select.Option>
                <Select.Option value="hr">HR</Select.Option>
                <Select.Option value="finance">Finance</Select.Option>
                <Select.Option value="sales">Sales</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
              <Select>
                <Select.Option value="employee">Employee</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
              </Select>
            </Form.Item>

            </FormRow>

            <Form.Item
              name="profilePictureUrl"
              label="Profile Picture URL"
              rules={[{ required: true }]}
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
  );
};

export default Register;
