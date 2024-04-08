'use client';
import React, { ReactNode } from 'react';
import { cn } from '@shared/lib/utils/tailwind';

interface IAppButtonProps {
  children?: ReactNode;
  type?: 'button' | 'reset' | 'submit';
  onClick?: () => void;
  classNameButton?: string;
  size?: 'full';
  border?: 'rounded' | 'border-none';
  bgColor?: 'sky' | 'transparent';
  textColor?: 'white';
  disabled?: boolean;
}

/**
 * Компонент кнопки для приложения.
 *
 * @param children - Дочерние элементы кнопки, например, текст или иконка.
 * @param type - Тип кнопки (button, reset, submit).
 * @param onClick - Функция обратного вызова, вызываемая при клике на кнопку.
 * @param classNameButton - Дополнительный класс для кнопки.
 * @param size - Размер кнопки.
 * @param border - Тип кнопки.
 * @param bgColor - Цвет кнопки.
 * @param textColor - Цвет кнопки.
 * @param disabled - Активность кнопки.
 */
const AppButton: React.FC<IAppButtonProps> = (
  {
    children,
    type = 'button',
    onClick,
    size = 'full',
    classNameButton,
    border = 'rounded',
    bgColor = 'sky',
    textColor = 'white',
    disabled = false,
  }) => {
  /**
   * Общий класс для стилизации кнопок.
   */
  const generalClass =
    'relative flex items-center justify-center shrink-0 transition-all hover:opacity-70 duration-100 px-5 py-2.5';

  /**
   * Размеры кнопок.
   */
  const sizeList = {
    full: 'w-full',
  };

  /**
   * Типы кнопок.
   */
  const borderList = {
    'border-none': 'border-none',
    rounded: 'rounded-full',
  };

  /**
   * Цвета для кнопок.
   */
  const bgColorList = {
    sky: 'bg-sky',
    transparent: 'transparent',
  };

  /**
   * Цвета для кнопок.
   */
  const textColorList = {
    white: 'text-white',
    transparent: 'transparent',
  };

  /**
   * Обработчик клика.
   */
  const handlerClick = () => typeof onClick === 'function' && onClick();

  return (
    <button
      className={cn(
        generalClass,
        sizeList[size],
        borderList[border],
        bgColorList[bgColor],
        textColorList[textColor],
        classNameButton,
      )}
      type={type}
      onClick={handlerClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default AppButton;
