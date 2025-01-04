import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import DropdownComponent from 'src/components/custom-select/DropdownComponent';
import Swal from 'sweetalert2';
import { SingleValue } from 'react-select';
import { User } from 'src/apis/types';
import { useUserStore } from 'src/hooks/use-user-store';
import axiosInstance from 'src/apis/config/axios';

type OptionType = {
  value: string;
  label: string;
};

type FormDataType = {
  _id?: string;
  displayName: string;
  email: string;
  phone: string;
  role: string;
  personalEmail: string;
};

type ModalEditUserProps = {
  isOpen: boolean;
  selectedUser: User | null;
  onClose: () => void;
};

const ModalEditUser: React.FC<ModalEditUserProps> = ({ isOpen, selectedUser, onClose }) => {
  const { setIsOpen } = useUserStore();

  const [formData, setFormData] = useState<FormDataType>({
    displayName: '',
    email: '',
    phone: '',
    role: '',
    personalEmail: '',
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        _id: selectedUser._id,
        displayName: selectedUser.displayName,
        email: selectedUser.email,
        phone: selectedUser.phone,
        role: selectedUser.role,
        personalEmail: selectedUser.personalEmail,
      });
    }
  }, [selectedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (
    action: keyof FormDataType,
    selectedOption: SingleValue<OptionType>
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [action]: selectedOption ? selectedOption.value : '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formData._id) {
        const response = await axiosInstance.put(`/api/admin/users/edit/${formData._id}`, formData);
        if (response.data) {
          setIsOpen(false);
          onClose();
          Swal.fire('Thành công', 'Cập nhật người dùng thành công', 'success').then(() => {
            window.location.reload();
            onClose();
          });
        } else {
          Swal.fire('Thất bại', 'Cập nhật người dùng thất bại', 'error');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'An error occurred while updating user', 'error');
    }
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  const roleOptions: OptionType[] = [
    { value: '6759a318bdadd030d0029639', label: 'Ban chủ nhiệm khoa' },
    { value: '6759a2efbdadd030d0029634', label: 'Sinh viên' },
    { value: '67593968b4c9c77f87657a18', label: 'Giảng viên' },
    { value: '675efcfcf5200355f4e3c04e', label: 'Chưa phân quyền' },
  ];
  const statusOptions: OptionType[] = [
    { value: '1', label: 'Khóa Tài Khoản' },
    { value: '0', label: 'Hoạt Động' },
  ];
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Edit User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Display Name"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <DropdownComponent
            placeholder="Chọn Vai Trò"
            options={roleOptions}
            onChange={(selectedOption) => {
              handleDropdownChange('role', selectedOption);
            }}
          />
          {/* <DropdownComponent
            placeholder="Chọn trạng thái"
            options={statusOptions}
            onChange={(selectedOption) => {
              handleDropdownChange('status', selectedOption);
            }}
          /> */}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalEditUser;
