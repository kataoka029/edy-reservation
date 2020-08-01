import { CardElement } from "@stripe/react-stripe-js";

import config from "../config";

const url = config.url;

export const makeReservation = async (event, stripe, elements, data) => {
  event.preventDefault();

  const response = await fetch(`${url}payment`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const paymentIntent = await response.json();
  const clientSecret = paymentIntent.client_secret;
  console.log("PAYMENT INTENT - ", paymentIntent);

  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement),
    },
  });

  if (result.error) {
    console.log("ERROR - makeReservation() - ", result.error.message);
  } else if (result.paymentIntent.status === "succeeded") {
    console.log("SUCCESS - makeReservation() - ", result);
  }
};
