import React from "react";  
import { currentUser } from "@clerk/nextjs/server";

const DashboardPage = async () => {

  const user = await currentUser();

  return (
    <div className="flex">
      <div className="flex">
        <div className="p-4 mt-16 lg:mt-0">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>Selamat Datang di dashboard {user?.firstName}!</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
