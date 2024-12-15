import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export function SignInView() {
  const [showPassword, setShowPassword] = useState(false);

  type LoginCardProps = {
    title: string;
    image: string;
    description: string;
    text: string;
    link: string;
  };
  const navigate = useNavigate();

  const LoginCard = ({ title, image, description, text, link }: LoginCardProps) => (
    <Box
      onClick={() => (navigate(link))}
      className="login-item-card flex flex-col items-center justify-between"
      sx={{
        borderRadius: 1,
        p: 4,
        textAlign: 'center',
        backgroundColor: 'white',
        width: '32%',
        minHeight: '260px',
        cursor: 'pointer', // Hiển thị con trỏ tay khi hover
        boxShadow: 3,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)', // Hiệu ứng phóng to khi hover
        },
      }}
    >
      <img
        src={image}
        alt={title}
        className="login-item-img"
        style={{ width: '80px', height: '80px', borderRadius: 1, marginBottom: 8 }}
      />
      <div className="flex flex-col gap-1 h-3/5">
        <Typography variant="h5" className="login-item-title login-item-text-color">
          {title}
        </Typography>
        <Typography variant="body1" className="login-item-description text-md login-item-text-color">
          {description}
        </Typography>
        <Typography variant="body1" className="login-item-text login-item-text-color">
          {text}
        </Typography>
      </div>
    </Box>
  );

  return (
    <div className="flex flex-col items-center">
      <h1
        className="login-title"
        style={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 700,
        }}
      >
        ĐĂNG NHẬP
      </h1>
      <div className="flex gap-10">
        <LoginCard
          title="Microsoft 365"
          image="https://static.vecteezy.com/system/resources/thumbnails/028/339/963/small_2x/microsoft-icon-logo-symbol-free-png.png"
          description="Sinh Viên & Quản Lý"
          text="Đăng nhập với tài khoản Microsoft 365."
          link="/sign-in-vlu" // Link trang đích
        />
        <LoginCard
          title="Văn Lang"
          image="https://cdn.haitrieu.com/wp-content/uploads/2022/12/Icon-Dai-Hoc-Van-Lang.png"
          description="Sinh Viên & Quản Lý"
          text="Đăng nhập với tài khoản Văn Lang."
          link="/sign-in-vlu" // Link trang đích
        />
        <LoginCard
          title="Đăng nhập"
          image="https://cdn-icons-png.flaticon.com/512/2942/2942813.png"
          description="Supper Admin"
          text="Đăng nhập với tài khoản được cấp cho Admin."
          link="/sign-in-vlu" // Link nội bộ trang web
        />
      </div>
    </div>
  );
}
