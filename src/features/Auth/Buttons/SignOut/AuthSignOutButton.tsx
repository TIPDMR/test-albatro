'use client';
import React from 'react';
import AppButton from '@shared/ui/Buttons/AppButton';
import { signOut } from 'next-auth/react';

const AuthSignOutButton = () => {

  return (
    <AppButton bgColor="transparent" classNameButton="text-2xl text-red-600  font-semibold" onClick={() => signOut({ callbackUrl: '/' })}>
      &gt; Выход &lt;
    </AppButton>
  );
};

export default AuthSignOutButton;
