import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import "./style.scss";
import Card from "./Card";
import Email from "./Email";
import Name from "./Name";
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
      body: JSON.stringify(data),
      headers,
      method: "POST",
      mode: "cors",
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
      <Name setFamilyName={setFamilyName} setLastName={setLastName} />
      <Email setEmail={setEmail} />
      <Card />
      <button type="submit" disabled={!stripe}>
        PAY
      </button>
    </form>
  );
};

export default PaymentForm;
