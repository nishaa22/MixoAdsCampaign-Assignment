"use client";

export default function Error({ error, reset }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-red-600">
        Something went wrong!
      </h2>
      <button
        className="mt-4 px-4 py-2 bg-black text-white"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
