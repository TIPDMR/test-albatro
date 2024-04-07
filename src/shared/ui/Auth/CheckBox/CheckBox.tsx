import React, { ChangeEvent, FC, forwardRef, Ref } from 'react';
import { cn } from '@shared/lib/utils/tailwind';
import AuthInputText from '@shared/ui/Auth/InputText/AuthInputText';

interface IAuthCheckBoxProps {
  name: string;
  className?: string;
  required?: boolean;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AuthCheckBox: FC<IAuthCheckBoxProps> = forwardRef((
  {
    name,
    className,
    required,
    checked,
    onChange,
    ...props
  }, ref: Ref<HTMLInputElement>) => {

  const defaultClassName = 'w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-0 checked:bg-sky';

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      id={name}
      name={name}
      onChange={onChange}
      className={cn(defaultClassName, className)}
      required={required}
      {...props}
    />
  );
});
AuthCheckBox.displayName = 'AuthCheckBox';

export default AuthCheckBox;
