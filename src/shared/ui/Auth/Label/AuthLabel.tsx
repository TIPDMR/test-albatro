import React, { FC, ReactNode } from 'react';
import { cn } from '@shared/lib/utils/tailwind';

interface IAuthLabelProps {
  htmlFor: string;
  className?: string;
  children?: ReactNode;
}

const AuthLabel: FC<IAuthLabelProps> = ({ htmlFor, className, children }) => {
  const defaultClassName = 'text-sm font-medium text-gray-600';
  return (
    <label htmlFor={htmlFor} className={cn(defaultClassName, className)}>
      {children}
    </label>
  );
};

export default AuthLabel;
