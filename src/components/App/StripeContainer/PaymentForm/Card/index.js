import React from "react";
import "./style.scss";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const Card = () => {
  return (
    <section className="card">
      <CardElement
        options={{
          style: {
            base: {
              backgroundColor: "#ffffff",
              color: "#304040",
              fontSize: "16px",
              "::placeholder": {
                color: "#cdd6d1",
              },
              lineHeight: "60px",
            },
          },
        }}
      />
    </section>
  );
};

export default Card;
