import React from "react";
import "./style.scss";

const Name = (props) => {
  return (
    <section className="name">
      <input
        type="text"
        placeholder="姓"
        onChange={(e) => props.setFamilyName(e.target.value)}
      />
      <input
        type="text"
        placeholder="名"
        onChange={(e) => props.setLastName(e.target.value)}
      />
    </section>
  );
};

export default Name;
