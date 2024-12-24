import { useState, useCallback, useMemo } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import type { User } from 'src/apis/types';
import { getListRole } from 'src/apis/services/userService';
import { Button } from '@mui/material';
import axios from 'axios';
import { useUserStore } from 'src/hooks/use-user-store';
import Swal from 'sweetalert2';
// ----------------------------------------------------------------------

type UserTableRowProps = {
  row: User;
  selected: boolean;
  onSelectRow: () => void;
  roleList: { _id: string; tenrole: string }[];
};

type Role = {
  _id: string;
  tenrole: string;
};

export function UserTableRow({ row, selected, onSelectRow, roleList }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const { setUserSelected, setIsOpen } = useUserStore();
  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleAction = async (action: string, data: User) => {
    switch (action) {
      case 'edit':
        setIsOpen(true);
        setUserSelected(data);
        break;

      case 'delete': {
        try {
          const result = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: `Bạn muốn xoá người dùng ${data.displayName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
          });

          if (result.isConfirmed) {
            // Xóa người dùng nếu xác nhận
            const success = await apiDeleteUser(data._id);
            if (success) {
              Swal.fire({
                title: 'Thành Công!',
                text: 'Người dùng đã được xoá.',
                icon: 'success',
                confirmButtonText: 'OK',
              });
              handleClosePopover();
            } else {
              Swal.fire({
                title: 'Thất Bại!',
                text: 'Không thể xoá người dùng. Vui lòng thử lại.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            }
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          Swal.fire({
            title: 'Lỗi!',
            text: 'Đã xảy ra lỗi trong quá trình xoá người dùng.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
        break;
      }

      default:
        break;
    }
  };

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleRenderStatusActive = (status: boolean) => {
    const statusActive = status ? 'Đang hoạt động' : 'Đã khoá';
    return statusActive;
  };

  const apiDeleteUser = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/admin/users/${id}`);
      if (response.data) {
        Swal.fire('Thành công', 'Cập nhật người dùng thành công', 'success');
        return true;
      }
      alert('Có lỗi xảy ra');
      Swal.fire('Thất bại', 'Có lỗi xảy ra', 'error');

      return false;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  };

  const roleMap = useMemo(
    () => new Map(roleList.map((role) => [role._id, role.tenrole])),
    [roleList]
  );
  const getTenRoleById = (id: string): string | undefined => roleMap.get(id);
  const formatDateToLocal = (isoDate: string): string => {
    const result = isoDate ? moment(isoDate).format('YYYY-MM-DD HH:mm:ss') : '-';
    return result;
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar
              alt={row.displayName}
              src="https://greekherald.com.au/wp-content/uploads/2020/07/default-avatar.png"
            />
            {row.displayName}
          </Box>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.email}
        </TableCell>

        <TableCell>{getTenRoleById(row.role)}</TableCell>

        {/* <TableCell>{formatDateToLocal(row.lastLogin)}</TableCell> */}
        <TableCell>{row.phone}</TableCell>

        <TableCell align="center">
          {row.status ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell>
          <Label color={!row.status ? 'error' : 'success'}>
            {handleRenderStatusActive(row.status)}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={() => handleAction('edit', row)}>
            <Button
              data-bs-toggle="modal"
              data-bs-target="#editUserModal"
              id="editUserModalLabel"
              color="inherit"
            >
              <Iconify icon="solar:pen-bold" />
              Chỉnh Sửa
            </Button>
          </MenuItem>
          <MenuItem onClick={() => handleAction('delete', row)} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Xóa
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
