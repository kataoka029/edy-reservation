import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import "./style.scss";
import { makeReservation } from "../../../../utils";
import config from "../../../../config";

const url = config.url;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [unlockedAt, setUnlockedAt] = useState("");
  const [userNum, setUserNum] = useState(1);

  const lineUserId = "Tf42bb47c877c9e5543ca4eda7661e142";

  useEffect(() => {
    if (!lineUserId) return [];
    fetch(`${url}api/users/${lineUserId}`)
      .then((res) => res.json())
      .then((data) => {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPhoneNumber(data.phone_number);
      });
  }, []);

  const data = {
    firstName,
    lastName,
    phoneNumber,
    unlockedAt,
    userNum,
  };

  return (
    <div className="payment-form">
      <p>Empty Dressy 来店予約フォーム</p>

      <form onSubmit={(e) => makeReservation(e, stripe, elements, data)}>
        <div className="row first-name">
          <span className="material-icons">account_circle</span>
          <label>姓</label>
          <input
            type="text"
            placeholder="姓"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="row last-name">
          <span className="material-icons">account_circle</span>
          <label>名</label>
          <input
            type="text"
            placeholder="名"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="row phone-number">
          <span className="material-icons">phone_iphone</span>
          <label>電話番号</label>
          <input
            type="tel"
            placeholder="09012345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="row unlocked-at">
          <span className="material-icons">lock_open</span>
          <label>予約時間</label>
          <input
            type="datetime-local"
            value={unlockedAt}
            onChange={(e) => setUnlockedAt(e.target.value)}
          />
        </div>

        <div className="row user-num">
          <span className="material-icons">person_add</span>
          <label>人数</label>
          <input
            type="number"
            value={userNum}
            onChange={(e) => setUserNum(e.target.value)}
          />
        </div>

        <div className="row amount">
          <span className="material-icons">account_balance_wallet</span>
          <label>合計金額</label>
          <span>{userNum * 3480}</span>
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
