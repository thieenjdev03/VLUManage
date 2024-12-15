import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';
import { Main } from './main';
import { LayoutSection } from '../core/layout-section';

// ----------------------------------------------------------------------

export type AuthLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function AuthLayout({ sx, children, header }: AuthLayoutProps) {
  const layoutQuery: Breakpoint = 'md';

  return (
    <div className="h-full w-full background-login h-screen">
      <div
        style={{ backgroundColor: '#E21832' }}
        className="header-login h-10 w-full bg-black mt-auto mb-auto flex items-center"
      >
        <img
          src="https://vhub.vanlanguni.edu.vn/Storages/Logos/_qvoe6720QV_VLU_Logo_Final_VLU_logo%20ngang_Vie_RedWhite.png"
          height={32}
          alt=""
          className="vlu-logo"
        />
      </div>
      <Main layoutQuery={layoutQuery}>{children}</Main>
    </div>
  );
}
