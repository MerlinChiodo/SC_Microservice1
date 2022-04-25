import React, { useEffect } from "react";

export const Licenses = () => {

  useEffect(() => {
    document.title = "Bürgerbüro - Genehmigungen";
  }, []);

  return (
    <div>
      <h1>Genehmigungen</h1>
    </div>
  );
};
