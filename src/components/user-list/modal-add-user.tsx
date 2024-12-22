import React, { useState } from "react";
import { Button } from "@mui/material";
import { Iconify } from 'src/components/iconify';
import Box from '@mui/material/Box';
import DropdownComponent from 'src/components/custom-select/DropdownComponent';

type OptionType = {
  value: string;
  label: string;
};
const ModalAddUser: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Thực hiện xử lý logic khi thêm người dùng, ví dụ: gọi API.
    setFormData({ fullName: "", email: "", phone: "" }); // Reset form
  };

  const majorOptions: OptionType[] = [
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue" },
  ];

  const roleOptions: OptionType[] = [
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue" },
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
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
                  <DropdownComponent
                    placeholder="Chọn ngành học"
                    options={majorOptions}
                    id="major-select"
                    label="Ngành học"
                  />

                  <DropdownComponent
                    placeholder="Chức vụ"
                    options={roleOptions}
                    id="role-select"
                    label="Chọn Chức Vụ"
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
