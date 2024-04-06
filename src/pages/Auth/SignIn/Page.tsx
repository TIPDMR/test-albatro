import Link from 'next/link';
import React from 'react';
import AuthLayout from '@layouts/Auth';
import AuthMainContainer from '@entities/Auth/AuthMainContainer/AuthMainContainer';
import AuthTitle from '@entities/Auth/AuthTitle/AuthTitle';
import SignInForm from '@widgets/SignInForm/SignInForm';
import AuthLinkBox from '@entities/Auth/AuthLinkBox/AuthLinkBox';
import AuthFormBox from '@entities/Auth/AuthFormBox/AuthFormBox';

const SignInPage = () => {
  return (
    <AuthLayout>
      <AuthMainContainer>
        <AuthFormBox>
          <AuthTitle headingText="Sign In" />
          <SignInForm />
        </AuthFormBox>
        <AuthLinkBox>
          <Link className="hover:border-b transition-all" href="/sign-up">Not a member? SignUp</Link>
        </AuthLinkBox>
      </AuthMainContainer>
    </AuthLayout>
  );
};
export default SignInPage;
