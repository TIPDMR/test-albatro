import React, { FC, ReactNode } from 'react';

interface IAuthFormBoxProps {
  children: ReactNode;
}

const AuthFormBox: FC<IAuthFormBoxProps> = ({ children }) => {
  return (
    <div className="box-border flex flex-col justify-center gap-y-5 rounded bg-white p-10 tall:py-6 xs:px-5 xs:py-10 sm:h-fit sm:gap-y-14 sm:p-10 tall:gap-y-5">
      {children}
    </div>
  );
};

export default AuthFormBox;
