import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import "./style.scss";
import config from "../../../../config";

const url = config.url;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [familyName, setFamilyName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    console.log(familyName, lastName, email);
    event.preventDefault();

    // paymentIntent (clientSecret)を取得
    const headers = {
      "Content-type": "application/json",
    };
    const data = {
      amount: 1000,
      familyName,
      lastName,
      email,
    };
    const response = await fetch(`${url}payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    const paymentIntent = await response.json();
    const clientSecret = paymentIntent.client_secret;
    console.log("PAYMENT INTENT: ", paymentIntent);

    // 支払いを確認
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (result.error) {
      console.log("ERROR: ", result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      console.log("PAYMENT RESULT: ", result);
      // await fetch(`${url}users`, {
      //   method: "POST",
      //   headers,
      //   body: JSON.stringify(data),
      // });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="name">
        <input
          type="text"
          placeholder="姓"
          onChange={(e) => setFamilyName(e.target.value)}
        />
        <input
          type="text"
          placeholder="名"
          onChange={(e) => setLastName(e.target.value)}
        />
      </section>
      <section className="email">
        <input
          type="email"
          placeholder="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
        />
      </section>
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
      <button type="submit" disabled={!stripe}>
        PAY
      </button>
    </form>
  );
};

export default PaymentForm;
