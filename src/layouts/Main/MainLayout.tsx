import React, { ReactNode, FC } from 'react';

interface IHomeLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<IHomeLayoutProps> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {children}
    </main>
  );
};

export default MainLayout;
