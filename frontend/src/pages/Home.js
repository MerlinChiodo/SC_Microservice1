import React, { useEffect } from "react";

export const Home = () => {

  useEffect(() => {
    document.title = "Bürgerbüro - Startseite";
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};
