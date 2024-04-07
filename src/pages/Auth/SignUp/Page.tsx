'use client'
import Link from 'next/link';
import React from 'react';
import AuthLayout from '@layouts/Auth';
import AuthMainContainer from '@entities/Auth/AuthMainContainer/AuthMainContainer';
import AuthTitle from '@entities/Auth/AuthTitle/AuthTitle';
import SignUpForm from '@widgets/SignUpForm/SignUpForm';
import AuthLinkBox from '@entities/Auth/AuthLinkBox/AuthLinkBox';
import AuthFormBox from '@entities/Auth/AuthFormBox/AuthFormBox';

const SignUpPage = () => {
  return (
    <AuthLayout>
      <AuthMainContainer>
        <AuthFormBox>
          <AuthTitle headingText="Sign Up" />
          <SignUpForm />
        </AuthFormBox>
        <AuthLinkBox>
          <Link className="hover:border-b transition-all" href="/sign-in">Not a member? SignIn</Link>
        </AuthLinkBox>
      </AuthMainContainer>
    </AuthLayout>
  );
};
export default SignUpPage;
