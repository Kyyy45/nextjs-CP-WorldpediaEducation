import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center hc w-full">
      <h4 className="text-center text-lg font-medium">
        Akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini.
      </h4>
    </div>
  );
};

export default ErrorPage;