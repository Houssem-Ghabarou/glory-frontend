import React from "react";
import Admin from "../../../../components/pages/admin/Admin";

async function Adminpages() {
  const data = await fetch(
    "https://mocki.io/v1/d7f0ab16-c797-41b9-ba33-90ba8c06eb05"
  );
  const res = await data.json();
  console.log("res", res);
  return <Admin />;
}

export default Adminpages;
