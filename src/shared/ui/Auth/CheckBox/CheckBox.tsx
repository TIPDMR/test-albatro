import React, { FC, ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { cn } from '@shared/lib/utils/tailwind';

interface IAuthCheckBoxProps {
  name: string;
  className?: string;
  required?: boolean;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AuthCheckBox: FC<IAuthCheckBoxProps> = (
  {
    name,
    className,
    required,
    checked,
    onChange,
  }) => {

  const defaultClassName = 'w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-0 checked:bg-sky';

  return (
    <input
      type="checkbox"
      checked={checked}
      id={name}
      name={name}
      onChange={onChange}
      className={cn(defaultClassName, className)}
      required={required}
    />
  );
};

export default AuthCheckBox;
