import { FC, ReactNode } from 'react';

interface IAuthLinkProps {
  children: ReactNode;
}

const AuthLinkBox: FC<IAuthLinkProps> = ({ children }) => {
  return (
    <div className="mt-5 text-center bt-5 xs:mt-10">
      {children}
    </div>
  );
};

export default AuthLinkBox;
