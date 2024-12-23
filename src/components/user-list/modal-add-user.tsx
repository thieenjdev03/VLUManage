import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import Box from '@mui/material/Box';
import DropdownComponent from 'src/components/custom-select/DropdownComponent';
import axios from 'axios';
import { SingleValue } from 'react-select';

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
      const response = await axios.post('http://localhost:3000/api/admin/users', {
        displayName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        personalEmail: formData.personalEmail,
        status: formData.status,
      });

      if (response.data) {
        alert('Thêm mới thành công!');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          role: '',
          personalEmail: '',
          status: true,
        });
      } else {
        alert('Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Có lỗi xảy ra khi thêm người dùng');
    }
  };

  const roleOptions: OptionType[] = [
    { value: '6759a318bdadd030d0029639', label: 'Ban chủ nhiệm khoa' },
    { value: '6759a2efbdadd030d0029634', label: 'Sinh viên' },
    { value: '67593968b4c9c77f87657a18', label: 'Giảng viên' },
    { value: '675efcfcf5200355f4e3c04e', label: 'Chưa phân quyền' },
  ];

  return (
    <>
      <Button
        data-bs-toggle="modal"
        data-bs-target="#addUserModal"
        id="addUserModalLabel"
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="mingcute:add-line" />}
      >
        Thêm Người Dùng
      </Button>
      {/* Modal */}
      <div
        className="modal fade"
        id="addUserModal"
        tabIndex={-1}
        aria-labelledby="addUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-in-user-list">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModalLabel">
                Thêm người dùng mới
              </h5>
              <Button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="personalEmail" className="form-label">
                    Email cá nhân
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="personalEmail"
                    name="personalEmail"
                    value={formData.personalEmail}
                    onChange={handleChange}
                  />
                </div>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    marginBottom: '16px',
                  }}
                >
                  <DropdownComponent
                    placeholder="Chọn Chức Vụ"
                    options={roleOptions}
                    id="role-select"
                    label="Chọn Chức Vụ"
                    onChange={handleDropdownChange}
                  />
                </Box>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100 v-primary-btn">
                  Thêm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddUser;
