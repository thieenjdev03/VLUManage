import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Trang Chủ',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Quản Lý Người Dùng',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Quản Lý Học Kỳ',
    path: '/404',
    icon: icon('ic-cart'),
  },
  {
    title: 'Quản Lý Ngành',
    path: '/404',
    icon: icon('ic-blog'),
  },
  {
    title: 'Quản Lý Khóa',
    path: '/404',
    icon: icon('ic-lock'),
  },
  {
    title: 'Quản Lý Lớp Niên Chế',
    path: '/404',
    icon: icon('ic-disabled'),
  },
  {
    title: 'Quản Lý CVHT',
    path: '/404',
    icon: icon('ic-disabled'),
  },
  {
    title: 'Quản Lý Sinh Viên Lớp Niên Chế',
    path: '/404',
    icon: icon('ic-disabled'),
  },
  {
    title: 'Quản Lý Danh Mục Loại Xử Lý',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
