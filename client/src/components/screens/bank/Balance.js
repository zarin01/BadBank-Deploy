import React from "react";
import "./Bank";
import "./Balance.css";
import { Card } from "react-bootstrap";

export default function Balance() {
  const balance = JSON.parse(window.localStorage.getItem("balance"));
  const UserBalance = balance.balance;

  return (
    <div className="balance">
      <Card className="text-center" bg={"dark"} text={"light"}>
        <h1>Your balance is: {UserBalance}</h1>
      </Card>
    </div>
  );
}
