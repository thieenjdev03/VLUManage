import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import DropdownComponent from 'src/components/custom-select/DropdownComponent';
import Swal from 'sweetalert2';
import axios from 'axios';
import { SingleValue } from 'react-select';
import { useUserStore } from 'src/hooks/use-user-store';

type OptionType = {
  value: string;
  label: string;
};

type FormDataType = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  personalEmail: string;
  status: boolean;
};

const ModalAddUser: React.FC = () => {
  const { setIsOpenAdd, isOpenAdd } = useUserStore(); // State quản lý modal
  const [formData, setFormData] = useState<FormDataType>({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    personalEmail: '',
    status: true, // Default to active
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (selectedOption: SingleValue<OptionType>) => {
    setFormData({
      ...formData,
      role: selectedOption ? selectedOption.value : '', // Use value or an empty string if null
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put('http://localhost:3000/api/admin/users', {
        displayName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        personalEmail: formData.personalEmail,
        status: formData.status,
      });

      if (response.data) {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          role: '',
          personalEmail: '',
          status: true,
        });

        setIsOpenAdd(false);

        Swal.fire({
          title: 'Thành Công!',
          text: 'Thêm người dùng thành công.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        setIsOpenAdd(false);
        Swal.fire('Thất bại', 'Có lỗi xảy ra', 'error');
      }
    } catch (error) {
      console.error('Error adding user:', error);

      // Đóng modal trước khi hiển thị Swal
      setIsOpenAdd(false);

      Swal.fire('Thất bại', 'Có lỗi xảy ra khi thêm người dùng', 'error');
    }
  };

  const roleOptions: OptionType[] = [
    { value: '6759a318bdadd030d0029639', label: 'Ban chủ nhiệm khoa' },
    { value: '6759a2efbdadd030d0029634', label: 'Sinh viên' },
    { value: '67593968b4c9c77f87657a18', label: 'Giảng viên' },
    { value: '675efcfcf5200355f4e3c04e', label: 'Chưa phân quyền' },
  ];

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

  return (
    <Modal open={isOpenAdd} onClose={() => setIsOpenAdd(false)}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Thêm người dùng mới
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Họ và tên"
            name="fullName"
            value={formData.fullName}
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
            label="Email cá nhân"
            name="personalEmail"
            value={formData.personalEmail}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Số điện thoại"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <DropdownComponent
            placeholder="Chọn Chức Vụ"
            options={roleOptions}
            onChange={handleDropdownChange}
          />
          <Button
            style={{ backgroundColor: '#D62134' }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Thêm
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalAddUser;
