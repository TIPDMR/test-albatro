import { FC, ReactNode } from 'react';

interface IAuthFormProps {
  children: ReactNode;
}

const AuthForm: FC<IAuthFormProps> = ({ children }) => {
  return (
    <form className="flex flex-col gap-y-8 text-gray-400">
      {children}
    </form>
  );
};

export default AuthForm;
