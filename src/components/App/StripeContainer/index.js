import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./style.scss";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe("pk_test_X8CcqwGdvsTLXs5pnhGPlqSw");

const StripeContainer = () => {
  return (
    <div className="stripe-container">
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default StripeContainer;
