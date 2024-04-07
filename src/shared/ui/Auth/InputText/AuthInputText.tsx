import React, { ChangeEvent, forwardRef, HTMLInputTypeAttribute, Ref } from 'react';
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

const AuthInputText = forwardRef((
  {
    name,
    type = 'text',
    className,
    placeholder,
    required,
    value,
    onChange,
    ...props
  }: IAuthInputTextProps, ref: Ref<HTMLInputElement>,
) => {
  const defaultClassName = 'border-none pl-0 pt-0 pr-0 text-sm placeholder:text-sm placeholder:italic placeholder:text-slate-400 text-gray-600 focus:border-none focus:outline-none focus:ring-0';

  return (
    <input
      ref={ref}
      value={value}
      type={type}
      id={name}
      name={name}
      onChange={onChange}
      className={cn(defaultClassName, className)}
      placeholder={placeholder}
      required={required}
      {...props}
    />
  );
});

AuthInputText.displayName = 'AuthInputText';

export default AuthInputText;
