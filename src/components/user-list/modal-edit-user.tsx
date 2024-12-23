import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import DropdownComponent from 'src/components/custom-select/DropdownComponent';
import axios from 'axios';
import { SingleValue } from 'react-select';
import { User } from 'src/apis/types';

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
  status: boolean;
};

type ModalEditUserProps = {
  selectedUser: User | null; // Selected user data
  onClose?: () => void; // Callback to close the modal
  onUpdateSuccess?: () => void; // Callback to refresh the user list
};

const ModalEditUser: React.FC<ModalEditUserProps> = ({
  selectedUser,
  onClose,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState<FormDataType>({
    displayName: '',
    email: '',
    phone: '',
    role: '',
    personalEmail: '',
    status: true,
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
        status: selectedUser.status,
      });
    }
  }, [selectedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (selectedOption: SingleValue<OptionType>) => {
    setFormData({
      ...formData,
      role: selectedOption ? selectedOption.value : '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formData._id) {
        const response = await axios.put(`http://localhost:3000/api/admin/users/${formData._id}`, {
          displayName: formData.displayName,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          personalEmail: formData.personalEmail,
          status: formData.status,
        });

        if (response.data) {
          alert('Cập nhật thành công!');
        } else {
          alert('Có lỗi xảy ra');
        }
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Có lỗi xảy ra khi cập nhật người dùng');
    }
  };

  const roleOptions: OptionType[] = [
    { value: '6759a318bdadd030d0029639', label: 'Ban chủ nhiệm khoa' },
    { value: '6759a2efbdadd030d0029634', label: 'Sinh viên' },
    { value: '67593968b4c9c77f87657a18', label: 'Giảng viên' },
    { value: '675efcfcf5200355f4e3c04e', label: 'Chưa phân quyền' },
  ];

  return (
    <div
      className="modal fade"
      id="editUserModal"
      tabIndex={-1}
      aria-labelledby="editUserModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-in-user-list">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editUserModalLabel">
              Chỉnh sửa người dùng
            </h5>
            <Button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
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
                  value={formData.displayName}
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
                Cập nhật
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditUser;
