import axios from 'axios';
import type {User, Role} from '../types';

export const getUsers = async ():Promise<User[]> => {
  try {
    const response = await axios.get<User[]>('http://localhost:3000/api/admin/users');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching users:', error);
    throw new Error('Unable to fetch users. Please try again later.');
  }
};

export const getListRole = async ():Promise<Role[]> => {
  try {
    const response = await axios.get<Role[]>('http://localhost:3000/api/admin/roles');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching users:', error);
    throw new Error('Unable to fetch users. Please try again later.');
  }
};