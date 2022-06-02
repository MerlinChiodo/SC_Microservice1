import React, { useEffect } from "react";

export const AdminPage = () => {

  useEffect(() => {
    document.title = "Bürgerbüro - Admin";
  }, []);

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
};
