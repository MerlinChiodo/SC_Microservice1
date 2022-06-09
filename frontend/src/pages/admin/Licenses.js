import React, { useEffect } from "react";

export const AdminLicenses = () => {

  useEffect(() => {
    document.title = "Bürgerbüro - Genehmigungen";
  }, []);

  return (
    <div>
      <h1>Genehmigungen</h1>
    </div>
  );
};
