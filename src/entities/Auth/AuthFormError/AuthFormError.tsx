import React, { FC } from 'react';

interface IAuthFormErrorProps {
  text: string;
}

const AuthFormError: FC<IAuthFormErrorProps> = ({ text }) => {
  return (
    <span className="absolute flex items-center pt-1left-0 bottom-[-25px] text-red-600 text-xs">{text}</span>
  );
};

export default AuthFormError;
