'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
  email: string;
  password: string;
  remember: boolean;
}

const SignInForm = () => {
  const router = useRouter();
  const {
    setError,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: {
      email:  "john@mail.com",
      password: "changeme",
      remember: true,
    },
    mode: 'all',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      remember: data.remember,
      redirect: false,
    });
    if (res && res.status === 401) {
      setError('email', {
        type: 'custom',
        message: `Пользователь не найден или пароль введен не верно`,
      });
    } else if (res && res.ok) {
      router.push('/');
    } else {
      setError('email', {
        type: 'custom',
        message: `Ошибка сервера`,
      });
    }
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)}>
      <AuthFieldset border>
        <AuthLabel className="cursor-pointer" htmlFor="email">
          <UserIcon className="h-5 w-5 text-gray" />
        </AuthLabel>
        <AuthInputText
          type="text"
          placeholder="email"
          {...register('email', {
            required: 'Email is required',
            minLength: { value: 5, message: 'Email should be at least 5 characters' },
            maxLength: { value: 30, message: 'Email should not exceed 30 characters' },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors?.email?.message && (
          <AuthFormError text={errors.email.message} />
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
        {errors?.password?.message && (
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
