import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { SignInVLUView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Đăng Nhập - ${CONFIG.appName}`}</title>
      </Helmet>
      <SignInVLUView />
    </>
  );
}
