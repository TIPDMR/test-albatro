'use client';
import { SessionProvider as Session } from 'next-auth/react';
import { FC, ReactNode } from 'react';

interface ISessionProviderProps {
  children: ReactNode;
}

/**
 * Компонент SessionProvider предоставляет контекст для управления сеансом аутентификации с помощью next-auth.
 * Обертывает дочерние компоненты в SessionProvider для предоставления доступа к данным сеанса аутентификации.
 *
 * @param children
 * @constructor
 */
export const SessionProvider: FC<ISessionProviderProps> = ({ children }) => {
  return <Session>{children}</Session>;
};
