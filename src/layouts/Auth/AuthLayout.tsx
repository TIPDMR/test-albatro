import { FC, ReactNode } from 'react';
import { cn } from '@shared/lib/utils/tailwind';

interface IAuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<IAuthLayoutProps> = ({ children }) => {
  return (
    <main className={cn('flex justify-center items-center h-full mx-auto w-screen sm:w-full  sm:max-w-md min-w-80 box-border')}>{children}</main>
  );
};

export default AuthLayout;
