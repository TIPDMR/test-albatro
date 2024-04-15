import { FC, FormEvent, FormEventHandler, ReactNode } from 'react';

interface IAuthFormProps {
  children: ReactNode;
  onSubmit?: (payload: FormEvent<HTMLFormElement>) => void;
}

const AuthForm: FC<IAuthFormProps> = ({ children, onSubmit }) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (onSubmit && typeof onSubmit === 'function')
      onSubmit(e);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-8 tall:gap-y-6 text-gray-400">
      {children}
    </form>
  );
};

export default AuthForm;
