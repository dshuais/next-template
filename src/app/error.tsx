/*
 * @Author: dushuai
 * @Date: 2024-04-15 17:10:01
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-19 11:11:23
 * @description: Error
 */
'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-6xl py-10 font-bold">Oops!</h1>
      <h2 className="py-5">Something went wrong!</h2>
      <button
        className="block mx-auto my-3 bg-amber-500 w-24 h-8 leading-8 rounded-md text-white hover:bg-amber-600 transition duration-300"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
