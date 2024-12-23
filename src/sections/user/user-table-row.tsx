import { useState, useCallback, useEffect } from 'react';
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
import { find } from 'lodash';
import { getListRole } from 'src/apis/services/userService';
import { Button } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

type UserTableRowProps = {
  row: User;
  selected: boolean;
  onSelectRow: () => void;
  setUserSelected: Dispatch<SetStateAction<User | null>>;
  roleList: { _id: string; tenrole: string }[];
  onDeleteSuccess: () => void;
};

type Role = {
  _id: string;
  tenrole: string;
};
export function UserTableRow({
  row,
  selected,
  onSelectRow,
  setUserSelected,
  roleList,
  onDeleteSuccess,
}: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

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
        alert('Thao tác thành công!');
        return true; // Return if successful
      }
      alert('Có lỗi xảy ra'); // Move outside of the else block
      return false; // Return failure
    } catch (error) {
      console.error('Error deleting user:', error);
      return false; // Return failure in case of an error
    }
  };

  const getTenRoleById = (
    roles: { _id: string; tenrole: string }[],
    id: string
  ): string | undefined => {
    const matchedRole = find(roles, { _id: id });
    return matchedRole?.tenrole; // Return tenrole if match found, else undefined
  };

  const formatDateToLocal = (isoDate: string): string => {
    const result = isoDate ? moment(isoDate).format('YYYY-MM-DD HH:mm:ss') : '-';
    return result;
  };
  const handleAction = async (action: string, data: User) => {
    switch (action) {
      case 'edit':
        setUserSelected(data);
        break;
      case 'delete': {
        const confirmed = window.confirm(`Bạn có chắc muốn xoá người dùng ${data.displayName}?`);
        if (confirmed) {
          const success = await apiDeleteUser(data._id);
          if (success) {
            onDeleteSuccess();
            handleClosePopover();
          }
        }
        break;
      }
      default:
        break;
    }
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

        <TableCell>{getTenRoleById(roleList, row.role)}</TableCell>

        <TableCell>{formatDateToLocal(row.lastLogin)}</TableCell>

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
          {/* <Label color={(row.status === 'banned' && 'error') || 'success'}>{row.status}</Label> */}
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
