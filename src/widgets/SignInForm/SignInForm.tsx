import React from 'react';
import AuthFieldset from '@entities/Auth/AuthFieldset/AuthFieldset';
import AuthLabel from '@shared/ui/Auth/Label/AuthLabel';
import UserIcon from '@shared/images/component/User';
import AuthInputText from '@shared/ui/Auth/InputText/AuthInputText';
import LockCloseIcon from '@shared/images/component/LockCloseIcon';
import AuthCheckBox from '@shared/ui/Auth/CheckBox/CheckBox';
import AppButton from '@shared/ui/Buttons/AppButton';
import AuthForm from '@shared/ui/Auth/Form';

const SignInForm = () => {
  return (
    <AuthForm>
      <AuthFieldset border>
        <AuthLabel className="cursor-pointer" htmlFor="username">
          <UserIcon className="h-5 w-5 text-gray" />
        </AuthLabel>
        <AuthInputText
          name="username"
          required
          type="text"
          placeholder="username"
        />
      </AuthFieldset>
      <AuthFieldset border>
        <AuthLabel className="cursor-pointer" htmlFor="password">
          <LockCloseIcon className="h-5 w-5 text-gray" />
        </AuthLabel>
        <AuthInputText
          name="password"
          required
          type="password"
          placeholder="password"
        />
      </AuthFieldset>
      <AuthFieldset>
        <AuthCheckBox
          name="remember"
          className="cursor-pointer"
          required
        />
        <AuthLabel className="cursor-pointer" htmlFor="remember">Remember me</AuthLabel>
      </AuthFieldset>
      <AppButton size="full"> Sign In </AppButton>
    </AuthForm>
  );
};

export default SignInForm;
