import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import "./style.scss";
import { makeReservation } from "../../../../utils";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [unlockedAt, setUnlockedAt] = useState("");

  const data = {
    amount: 1000,
    firstName,
    lastName,
    phoneNumber,
  };

  return (
    <div className="payment-form">
      <form onSubmit={(e) => makeReservation(e, stripe, elements, data)}>
        <div className="first-name">
          <input
            type="text"
            placeholder="姓"
            onChange={(e) => setfirstName(e.target.value)}
          />
        </div>

        <div className="last-name">
          <input
            type="text"
            placeholder="名"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="phone-number">
          <input
            type="tel"
            placeholder="電話番号（-を含めない）"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="unlocked-at">
          <input
            type="datetime-local"
            onChange={(e) => setUnlockedAt(e.target.value)}
          />
        </div>

        <div className="card">
          <CardElement
            options={{
              style: {
                base: {
                  backgroundColor: "#ffffff",
                  color: "#404142",
                  fontSize: "16px",
                  "::placeholder": {
                    color: "#cccccc",
                  },
                  lineHeight: "40px",
                },
              },
            }}
          />
        </div>
        <button type="submit" disabled={!stripe}>
          PAY
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
