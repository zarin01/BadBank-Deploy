import React from "react";
import { Card, Button } from "react-bootstrap";
import "./deposite.css";

export default function Deposit() {
  const [status, setStatus] = React.useState("");
  const [Deposit, setDepost] = React.useState(0);

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
    }
    return true;
  }

  function depositBalance() {
    if (!validate(Deposit)) return;

    const newBalance = UserBalance + parseInt(Deposit);
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
          {" "}
          <h1>
            <u>-- DEPOSIT --</u>
          </h1>{" "}
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
            value={Deposit}
            onChange={(e) => setDepost(e.currentTarget.value)}
          />{" "}
          <br /> <br />
          <Button onClick={depositBalance} variant="secondary">
            Deposit
          </Button>{" "}
        </Card.Body>
      </Card>
    </div>
  );
}
