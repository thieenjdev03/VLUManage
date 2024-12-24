import { useState, useCallback, useEffect } from 'react';
import { getUsers, getListRole } from 'src/apis/services/userService';
import ModalEditUser from 'src/components/user-list/modal-edit-user';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import ModalAddUser from 'src/components/user-list/modal-add-user';
import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Scrollbar } from 'src/components/scrollbar';
import Select from 'react-select';
import type { User } from 'src/apis/types';
import { Button } from '@mui/material';
import { Role } from 'src/apis/types';
import { useUserStore } from 'src/hooks/use-user-store';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows } from '../utils';

// ----------------------------------------------------------------------

export function UserView() {
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [userList, setUserList] = useState<User[]>([]);
  const { setUserSelected, userSelected, isOpen, setIsOpenAdd } = useUserStore();
  const [roleList, setRoleList] = useState<Role[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [users, roles] = await Promise.all([getUsers(), getListRole()]);
      setUserList(users);
      setRoleList(roles);
    };
    fetchData();
  }, []);
  console.log('check render');
  const handleOpenModal = () => {
    setIsOpenAdd(true);
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={2} mt={1}>
        <Typography variant="h4" flexGrow={1}>
          Quản Lý Người Dùng
        </Typography>
        <Button
          style={{ backgroundColor: '#141414' }}
          onClick={handleOpenModal}
          variant="contained"
        >
          Thêm Người Dùng
        </Button>
        <ModalAddUser />
      </Box>
      <Card>
        <div className="flex align-items-center justify-end">
          <div className="flex align-items-center justify-end">
            <Select
              options={[
                { value: 'all', label: 'Tất cả' },
                { value: 'verified', label: 'Đã xác thực' },
                { value: 'unverified', label: 'Chưa xác thực' },
              ]}
              placeholder="Lọc theo trạng thái"
              isClearable
              isSearchable={false}
              onChange={(value) => console.log(value)}
            />
            <UserTableToolbar
              numSelected={table.selected.length}
              filterName={filterName}
              onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFilterName(event.target.value);
                table.onResetPage();
              }}
            />
          </div>
        </div>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _users.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'displayName', label: 'Họ Tên' },
                  { id: 'emailDisplay', label: 'Email' },
                  { id: 'role', label: 'Chức vụ' },
                  { id: 'lastLogin', label: 'Lần Cuối Đăng Nhập' },
                  { id: 'phoneNumber', label: 'SĐT', align: 'center' },
                  { id: 'status', label: 'Trạng Thái' },
                  { id: '', label: 'Edit' },
                ]}
              />
              <TableBody>
                {userList.map((row) => (
                  <UserTableRow
                    key={row._id}
                    row={row}
                    selected={table.selected.includes(row._id)}
                    roleList={roleList}
                    onSelectRow={() => {
                      table.onSelectRow(row._id);
                    }}
                  />
                ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
      {userSelected && (
        <ModalEditUser
          isOpen={isOpen}
          selectedUser={userSelected}
          onClose={() => setUserSelected(null)}
        />
      )}
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
