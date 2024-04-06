import React, { FC, ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { cn } from '@shared/lib/utils/tailwind';

type CustomHTMLInputTypeAttribute = Exclude<HTMLInputTypeAttribute, 'checkbox'>;

interface IAuthInputTextProps {
  name: string;
  type?: CustomHTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AuthInputText: FC<IAuthInputTextProps> = (
  {
    name,
    type = 'text',
    className,
    placeholder,
    required,
    value,
    onChange,
  }) => {

  const defaultClassName = 'border-none pl-0 text-sm placeholder:text-sm placeholder:italic placeholder:text-slate-400 text-gray-600 focus:border-none focus:outline-none focus:ring-0';

  return (
    <input
      value={value}
      type={type}
      id={name}
      name={name}
      onChange={onChange}
      className={cn(defaultClassName, className)}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default AuthInputText;
