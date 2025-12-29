"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-red-600">
        Page Not Found!
      </h2>

      <p className="mt-2 text-gray-600">
        The page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-black text-white rounded"
      >
        Go Home
      </Link>
    </div>
  );
}
