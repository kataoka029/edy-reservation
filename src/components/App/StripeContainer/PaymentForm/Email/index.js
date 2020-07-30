import React from "react";
import "./style.scss";

const Email = (props) => {
  return (
    <section className="email">
      <input
        type="email"
        placeholder="メールアドレス"
        onChange={(e) => props.setEmail(e.target.value)}
      />
    </section>
  );
};

export default Email;
