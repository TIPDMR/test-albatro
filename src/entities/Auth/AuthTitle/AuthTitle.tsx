import Image from 'next/image';
import logoImages from '@shared/images/logo.png';
import { FC } from 'react';

interface IAuthTitleLogoProps {
  headingText: string;
}

const AuthTitle: FC<IAuthTitleLogoProps> = ({ headingText }) => {
  return (
    <div className="flex flex-col items-center gap-y-3">
      <Image className="tall:hidden" src={logoImages} alt="Logo" />
      <h1 className={'text-sky text-3xl'}>{headingText}</h1>
    </div>
  );
};

export default AuthTitle;
