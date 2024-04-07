import { FC, ReactNode } from 'react';
import { cn } from '@shared/lib/utils/tailwind';

interface IAuthFieldsetProps {
  children: ReactNode;
  className?: string;
  border?: boolean;
}

const AuthFieldset: FC<IAuthFieldsetProps> = ({ children, className, border }) => {
  return (
    <fieldset className={cn('relative flex items-center gap-x-3',border && "border-b border-b-gray pb-1",  className)}>
      {children}
    </fieldset>
  );
};

export default AuthFieldset;
