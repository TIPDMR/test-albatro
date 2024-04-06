import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';

/**
 * Функция для объединения классов Tailwind CSS и обычных CSS классов.
 * @param inputs - Классы, которые нужно объединить.
 * @returns Объединенные классы.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
