import React, { useEffect } from "react";

export const Account = () => {

  useEffect(() => {
    document.title = "Bürgerbüro - Meine Daten";
  }, []);

  return (
    <div>
      <h1>Meine Daten</h1>
    </div>
  );
};
