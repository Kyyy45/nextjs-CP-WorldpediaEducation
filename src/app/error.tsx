"use client"

import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center hc w-full">
      <h4 className="text-center text-lg font-medium">
        Terjadi kesalahan server internal. Silakan coba lagi nanti.
      </h4>
    </div>
  );
};

export default ErrorPage