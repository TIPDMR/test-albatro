'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import AuthFieldset from '@entities/Auth/AuthFieldset/AuthFieldset';
import AuthLabel from '@shared/ui/Auth/Label/AuthLabel';
import UserIcon from '@shared/images/component/User';
import AuthInputText from '@shared/ui/Auth/InputText/AuthInputText';
import LockCloseIcon from '@shared/images/component/LockCloseIcon';
import AuthCheckBox from '@shared/ui/Auth/CheckBox/CheckBox';
import AppButton from '@shared/ui/Buttons/AppButton';
import AuthForm from '@shared/ui/Auth/Form';
import AuthFormError from '@entities/Auth/AuthFormError/AuthFormError';

interface IFormInput {
  username: string;
  password: string;
  remember: boolean;
}

const SignInForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: {
      remember: true,
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)}>
      <AuthFieldset border>
        <AuthLabel className="cursor-pointer" htmlFor="username">
          <UserIcon className="h-5 w-5 text-gray" />
        </AuthLabel>
        <AuthInputText
          type="text"
          placeholder="username"
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 5, message: 'Username should be at least 5 characters' },
            maxLength: { value: 30, message: 'Username should not exceed 30 characters' },
          })}
          aria-invalid={errors.username ? 'true' : 'false'}
        />
        {errors?.username && (
          <span className="absolute left-0 bottom-[-25px] text-red-600 text-sm">{errors.username.message}</span>
        )}
      </AuthFieldset>

      <AuthFieldset border>
        <AuthLabel className="cursor-pointer" htmlFor="password">
          <LockCloseIcon className="h-5 w-5 text-gray" />
        </AuthLabel>
        <AuthInputText
          type="password"
          placeholder="password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 5, message: 'Password should be at least 5 characters' },
            maxLength: { value: 60, message: 'Password should not exceed 60 characters' },
          })}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors?.password && errors.password.message && (
          <AuthFormError text={errors.password.message} />
        )}
      </AuthFieldset>
      <AuthFieldset className="py-3">
        <AuthCheckBox
          className="cursor-pointer"
          {...register('remember')}
        />
        <AuthLabel className="cursor-pointer" htmlFor="remember">Remember me</AuthLabel>
      </AuthFieldset>
      <AppButton type={'submit'} size="full"> Sign In </AppButton>
    </AuthForm>
  );
};

export default SignInForm;
