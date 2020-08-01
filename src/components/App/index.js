import React from "react";

import "./style.scss";
import StripeContainer from "./StripeContainer";

const App = () => {
  return (
    <div className="app">
      <h1 className="title">Empty Dressy来店予約フォーム</h1>
      <StripeContainer />
    </div>
  );
};

export default App;
