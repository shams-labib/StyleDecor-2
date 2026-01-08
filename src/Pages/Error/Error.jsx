import React from "react";

const ErrorPage = ({ code = 404, message = "Oops! Something went wrong." }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-red-500 animate-pulse">
          {code}
        </h1>
        <h2 className="mt-4 text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
          {message}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          The page you are looking for might be removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 cursor-pointer px-6 py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
