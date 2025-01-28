"use client";
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-100 to-yellow-50 px-4 text-center">
      <div className="max-w-md">
        <h2 className="text-5xl font-extrabold text-green-600 mb-4">
          404: Not Found
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Sorry, we couldn’t find the resource you’re looking for. It might have been moved, deleted, or never existed.
        </p>
        <Link href="/" className="inline-block px-6 py-3 bg-green-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
          
            Return Home
          
        </Link>
      </div>
    </div>
  );
}
