import React, { useEffect } from "react";

export const Requests = () => {

  useEffect(() => {
    document.title = "Bürgerbüro - Anträge";
  }, []);

  return (
    <div>
      <h1>Anträge</h1>
    </div>
  );
};
