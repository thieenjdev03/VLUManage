import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { Button } from '@mui/material';
// ----------------------------------------------------------------------

export function SignInVLUView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = useCallback(() => {
    router.push('/');
  }, [router]);

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="email"
        label="Email"
        defaultValue="hello@gmail.com"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="password"
        label="Mật Khẩu"
        defaultValue="@demo1234"
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />
      <div className="flex gap-8 flex-col w-full align-center justify-center">
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          onClick={handleSignIn}
        >
          Đăng Nhập VLU
        </LoadingButton>
      </div>
    </Box>
  );

  return (
      <div className="ml-auto mr-auto rounded-sm bg-white p-8 rounded-md">
        <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
          <span style={{ color: '#D62134', fontSize: '20px', fontWeight: 'bold' }}>
            Đăng Nhập Bằng Tài Khoản VLU
          </span>
          <span
            style={{
              color: '#2D334D',
              fontSize: '13px',
              fontWeight: 'normal',
              width: '70%',
              textAlign: 'center',
            }}
          >
            {' '}
            Chỉ dành cho quản lý hoặc Admin mới có thể đăng nhập
          </span>
        </Box>
        {renderForm}
        <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
          <Typography
            variant="overline"
            sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
          >
            OR
          </Typography>
        </Divider>
        <Box gap={1} display="flex" justifyContent="center">
          <Button variant="outlined">
            <IconButton color="inherit">
              <Iconify icon="logos:google-icon" />
            </IconButton>
            Microsoft 365
          </Button>
        </Box>
    </div>
  );
}
