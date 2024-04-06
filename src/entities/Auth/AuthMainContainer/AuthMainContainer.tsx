import React, { FC } from 'react';
import { cn } from '@shared/lib/utils/tailwind';

interface IMainContainerProps {
  children: React.ReactNode;
}

const AuthMainContainer: FC<IMainContainerProps> = ({ children }) => {
  return (
    <div className={cn('w-full px-0 box-border')}>
      {children}
    </div>
  );
};

export default AuthMainContainer;
