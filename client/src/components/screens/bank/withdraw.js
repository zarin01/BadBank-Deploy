import React from "react";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./deposite.css";

export default function Deposit() {
  const [status, setStatus] = React.useState("");
  const [Withdraw, setWithdraw] = React.useState(0);

  const balance = JSON.parse(window.localStorage.getItem("balance"));
  const UserBalance = parseInt(balance.balance);

  function validate(field) {
    if (!field) {
      setStatus(alert(`You must add an input`));
      setTimeout(() => setStatus(""), 3000);
      return false;
    } else if (field < 0) {
      setStatus(alert(`You cant add a negative number`));
      setTimeout(() => setStatus(""), 3000);
      window.location.reload();
      return false;
    } else if (field > UserBalance) {
      setStatus(alert(`You don't have enough money`));
      setTimeout(() => setStatus(""), 3000);
      window.location.reload();
      return false;
    }
    return true;
  }

  function withdrawBalance() {
    if (!validate(Withdraw)) return;

    const newBalance = UserBalance - parseInt(Withdraw);
    window.localStorage.setItem(
      "balance",
      JSON.stringify({ balance: newBalance })
    );
    window.location.reload();
  }

  return (
    <div>
      <Card className="text-center" bg={"dark"} text={"light"}>
        <Card.Header>
          <h1>
            <u>-- WITHDRAW --</u>
          </h1>
        </Card.Header>
        <Card.Body>
          <Card.Title>Your balance is: </Card.Title> <br />
          <div className="balance">
            {" "}
            <Card.Text>{UserBalance}</Card.Text>
          </div>{" "}
          <br />
          <input
            type="number"
            className="form"
            id="Withdraw"
            placeholder="Withdraw"
            value={Withdraw}
            onChange={(e) => setWithdraw(e.currentTarget.value)}
          />{" "}
          <br /> <br />
          <Button onClick={withdrawBalance} variant="secondary">
            Withdraw
          </Button>{" "}
        </Card.Body>
      </Card>
    </div>
  );
}
