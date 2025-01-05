import React from 'react';
import Wrapper from '@/components/global/wrapper';
import Navbar from '@/components/navigation/navbar';
import Form from '@/components/registration/form';

const RegistrationPage = () => {
  return (
    <main className="relative bg-black flex justify-center  overflow-hidden mx-auto">
      <div className="max-w-7xl h-full w-full">
        <Wrapper>
          <Navbar />
          <Form />
        </Wrapper>
      </div>
    </main>
  );
};

export default RegistrationPage;
