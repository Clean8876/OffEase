// import React from 'react';
// import {
//   Form,
//   Input,
//   Button,
//   Select,
//   DatePicker,
//   Typography,
//   Modal,
// } from 'antd';
// import dayjs from 'dayjs';
// import { register } from '../../../../api/AuthApi';
// import {
//   ModalWrapper,
//   ModalTitle,
//   ModalContent,
//   FormRow
// } from './Register.styles';

// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const { Title } = Typography;

// const Register = ({ open, onClose }) => {
//   const [form] = Form.useForm();

//   const nameRegex = /^[A-Za-z]+$/;
//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

//   const onFinish = async (values) => {
//     try {
//       const payload = {
//         Firstname: values.Firstname,
//         Lastname: values.Lastname,
//         email: values.email,
//         password: values.password,
//         confirmPassword: values.confirmPassword,
//         dob: values.dob.format('YYYY-MM-DD'),
//         department: values.department,
//         role: values.role,
//         profilePictureUrl: values.profilePictureUrl,
//       };

//       const response = await register(payload);
//       console.log('Server Response:', response);
//       toast.success('Employee registered successfully!');
//       form.resetFields();
//       onClose();
//     } catch (error) {
//       console.error('Registration Error:', error);
//       toast.error('Registration failed. Please try again.');
//     }
//   };

//   const onFinishFailed = ({ errorFields }) => {
//     if (errorFields.length > 0) {
//       toast.warn(errorFields[0].errors[0]);
//     }
//   };

//   return (
//     <>
//       <Modal open={open} onCancel={onClose} footer={null} centered width={600}>
//         <ModalWrapper>
//           <ModalTitle level={3}>Register Employee</ModalTitle>
//           <ModalContent>
//             <Form
//               layout="vertical"
//               form={form}
//               onFinish={onFinish}
//               onFinishFailed={onFinishFailed}
//               initialValues={{ role: 'employee' }}
//             >
//               <FormRow>
//                 <Form.Item
//                   name="Firstname"
//                   label="First Name"
//                   rules={[
//                     { required: true, message: 'First name is required' },
//                     {
//                       pattern: nameRegex,
//                       message: 'First name should contain only letters',
//                     },
//                   ]}
//                 >
//                   <Input placeholder="Enter First Name" />
//                 </Form.Item>

//                 <Form.Item
//                   name="Lastname"
//                   label="Last Name"
//                   rules={[
//                     { required: true, message: 'Last name is required' },
//                     {
//                       pattern: nameRegex,
//                       message: 'Last name should contain only letters',
//                     },
//                   ]}
//                 >
//                   <Input placeholder="Enter Last Name" />
//                 </Form.Item>
//               </FormRow>

//               <Form.Item
//                 name="email"
//                 label="Email"
//                 rules={[
//                   { required: true, message: 'Email is required' },
//                   { type: 'email', message: 'Please enter a valid email' },
//                 ]}
//               >
//                 <Input placeholder="Enter Email" />
//               </Form.Item>

//               <Form.Item
//                 name="password"
//                 label="Password"
//                 rules={[
//                   { required: true, message: 'Password is required' },
//                   {
//                     pattern: passwordRegex,
//                     message:
//                       'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
//                   },
//                 ]}
//                 hasFeedback
//               >
//                 <Input.Password placeholder="Enter Password" />
//               </Form.Item>

//               <Form.Item
//                 name="confirmPassword"
//                 label="Confirm Password"
//                 dependencies={['password']}
//                 hasFeedback
//                 rules={[
//                   { required: true, message: 'Please confirm your password' },
//                   ({ getFieldValue }) => ({
//                     validator(_, value) {
//                       if (!value || getFieldValue('password') === value) {
//                         return Promise.resolve();
//                       }
//                       return Promise.reject(new Error('The two passwords do not match!'));
//                     },
//                   }),
//                 ]}
//               >
//                 <Input.Password placeholder="Confirm Password" />
//               </Form.Item>

//               <Form.Item
//                 name="dob"
//                 label="Date of Birth"
//                 rules={[{ required: true, message: 'Date of birth is required' }]}
//               >
//                 <DatePicker style={{ width: '100%' }} />
//               </Form.Item>

//               <FormRow>
//                 <Form.Item
//                   name="department"
//                   label="Department"
//                   rules={[{ required: true, message: 'Please select a department' }]}
//                 >
//                   <Select placeholder="Select Department">
//                     <Select.Option value="developer">Developer</Select.Option>
//                     <Select.Option value="marketing">Marketing</Select.Option>
//                     <Select.Option value="hr">HR</Select.Option>
//                     <Select.Option value="finance">Finance</Select.Option>
//                     <Select.Option value="sales">Sales</Select.Option>
//                   </Select>
//                 </Form.Item>

//                 <Form.Item
//                   name="role"
//                   label="Role"
//                   rules={[{ required: true, message: 'Please select a role' }]}
//                 >
//                   <Select>
//                     <Select.Option value="employee">Employee</Select.Option>
//                     <Select.Option value="admin">Admin</Select.Option>
//                   </Select>
//                 </Form.Item>
//               </FormRow>

//               <Form.Item
//                 name="profilePictureUrl"
//                 label="Profile Picture URL"
//                 rules={[{ required: true, message: 'Profile picture URL is required' }]}
//               >
//                 <Input placeholder="Enter image URL" />
//               </Form.Item>

//               <Form.Item>
//                 <Button type="primary" htmlType="submit" block>
//                   Register
//                 </Button>
//               </Form.Item>
//             </Form>
//           </ModalContent>
//         </ModalWrapper>
//       </Modal>

//       {/* Toast container to display toast notifications */}
//       <ToastContainer
//         position="top-center"
//         autoClose={4000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//     </>
//   );
// };

// export default Register;


import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import dayjs from "dayjs";
import { register } from "../../../../api/AuthApi";
import {
  CalendarIcon,
  UploadIcon,
  User2Icon,
  MailIcon,
  LockIcon,
  BriefcaseIcon,
  ShieldIcon,
  ImageIcon,
} from "lucide-react";

// ShadCN Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Form Schema
const formSchema = z.object({
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .regex(/^[A-Za-z]+$/, "First name should contain only letters"),
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[A-Za-z]+$/, "Last name should contain only letters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  dob: z.date({
    required_error: "Date of birth is required",
  }),
  department: z.string().min(1, "Please select a department"),
  role: z.string().min(1, "Please select a role"),
  profileImage: typeof window === "undefined" ? z.any() : z.instanceof(FileList)
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

 const Register = ({ open, onClose }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      department: "",
      role: "employee",
    },
  });

  const profileImageRef = form.register("profileImage");
  const profileImage = form.watch("profileImage");

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("Firstname", values.firstName);
      formData.append("Lastname", values.lastName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("dob", dayjs(values.dob).format("YYYY-MM-DD"));
      formData.append("department", values.department);
      formData.append("role", values.role);
      
      if (values.profileImage && values.profileImage.length > 0) {
        formData.append("profileImage", values.profileImage[0]);
      }

      const response = await register(formData);
      console.log("Server Response:", response);
      toast.success("Employee registered successfully!");
      form.reset();
      onClose();
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px] p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#5F259F]">
            Register Employee
          </DialogTitle>
        </DialogHeader>

        <Card className="p-6 border-0 shadow-none">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User2Icon className="h-4 w-4 text-[#5F259F]" />
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter first name"
                          {...field}
                          className="focus-visible:ring-[#5F259F]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User2Icon className="h-4 w-4 text-[#5F259F]" />
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter last name"
                          {...field}
                          className="focus-visible:ring-[#5F259F]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MailIcon className="h-4 w-4 text-[#5F259F]" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email"
                        {...field}
                        className="focus-visible:ring-[#5F259F]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <LockIcon className="h-4 w-4 text-[#5F259F]" />
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          {...field}
                          className="focus-visible:ring-[#5F259F]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <LockIcon className="h-4 w-4 text-[#5F259F]" />
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm password"
                          {...field}
                          className="focus-visible:ring-[#5F259F]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-[#5F259F]" />
                      Date of Birth
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="pl-3 text-left font-normal hover:bg-gray-50 focus-visible:ring-[#5F259F]"
                          >
                            {field.value ? (
                              dayjs(field.value).format("YYYY-MM-DD")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Department */}
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <BriefcaseIcon className="h-4 w-4 text-[#5F259F]" />
                        Department
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="focus-visible:ring-[#5F259F]">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="hr">HR</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <ShieldIcon className="h-4 w-4 text-[#5F259F]" />
                        Role
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="focus-visible:ring-[#5F259F]">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="employee">Employee</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Profile Image Upload */}
              <FormField
                control={form.control}
                name="profileImage"
                render={() => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-[#5F259F]" />
                      Profile Picture
                    </FormLabel>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        {profileImage && profileImage.length > 0 ? (
                          <AvatarImage
                            src={URL.createObjectURL(profileImage[0])}
                            alt="Profile preview"
                          />
                        ) : null}
                        <AvatarFallback className="bg-[#5F259F]/10 text-[#5F259F]">
                          <User2Icon className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="file"
                            className="hidden"
                            id="profileImage"
                            accept="image/*"
                            {...profileImageRef}
                          />
                          <label
                            htmlFor="profileImage"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5F259F]"
                          >
                            <UploadIcon className="h-4 w-4" />
                            Upload Image
                          </label>
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#159AFF] hover:bg-[#159AFF]/90 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Register Employee
              </Button>
            </form>
          </Form>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default Register;