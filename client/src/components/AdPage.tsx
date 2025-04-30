
/* src/components/AdPage.tsx */
import React from 'react';

export default function AdPage() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 w-full lg:w-1/2 h-full">
      <h2 className="text-4xl font-extrabold mb-4">Welcome to Our Platform</h2>
      <p className="mb-6 text-lg">
        Grow your business with cutting-edge solutions, robust features, and unparalleled support.
      </p>
      <ul className="space-y-2 text-left mb-8">
        <li className="flex items-center">
          <span className="inline-block w-2 h-2 bg-white rounded-full mr-3" />
          <span>Expert Digital Marketing</span>
        </li>
        <li className="flex items-center">
          <span className="inline-block w-2 h-2 bg-white rounded-full mr-3" />
          <span>Custom Software Development</span>
        </li>
        <li className="flex items-center">
          <span className="inline-block w-2 h-2 bg-white rounded-full mr-3" />
          <span>24/7 Support & Maintenance</span>
        </li>
      </ul>
      <div className="mt-auto">
        <a
          href="/"
          className="block bg-white text-blue-600 font-semibold py-2 px-4 rounded-full hover:opacity-90 transition"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}