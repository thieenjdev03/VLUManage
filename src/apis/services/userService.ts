import axiosInstance from '../config/axios';
import type { User, Role } from '../types';

// Fetch danh sách người dùng
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get<User[]>('/api/admin/users');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching users:', error);
    throw new Error('Unable to fetch users. Please try again later.');
  }
};

// Fetch danh sách vai trò
export const getListRole = async (): Promise<Role[]> => {
  try {
    const response = await axiosInstance.get<Role[]>('/api/admin/roles');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching roles:', error);
    throw new Error('Unable to fetch roles. Please try again later.');
  }
};
