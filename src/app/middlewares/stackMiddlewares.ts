import { NextMiddleware, NextResponse } from 'next/server';
import type { MiddlewareFactory } from '@/types/next';

/**
 * Строит цепочку middleware-функций из заданного массива функций middleware.
 * @param functions Массив функций middleware.
 * @param index Текущий индекс в массиве функций middleware (используется для рекурсии).
 * @returns Функция middleware, представляющая собой композицию всех функций middleware в массиве.
 */
export function stackMiddlewares(functions: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  // Получаем текущую middleware-функцию из массива по текущему индексу.
  const current = functions[index];

  // Проверяем, существует ли текущая middleware-функция.
  if (current) {
    // Если текущая middleware-функция существует, вызываем рекурсивно stackMiddlewares
    // для получения следующей middleware-функции в цепочке.
    const next = stackMiddlewares(functions, index + 1);

    // Возвращаем результат вызова текущей middleware-функции, передавая ей следующую middleware-функцию в качестве аргумента.
    return current(next);
  }

  // Если текущая middleware-функция не существует (мы достигли конца массива),
  // возвращаем функцию, которая просто вызывает NextResponse.next().
  return () => NextResponse.next();
}
