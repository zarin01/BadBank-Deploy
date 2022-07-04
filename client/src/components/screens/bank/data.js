import React from "react";
import { Card } from "react-bootstrap";

export default function Data() {
  // BRINGS IN THE USER DATA FROM LOCAL STORAGE

  const balance = JSON.parse(window.localStorage.getItem("balance"));
  const UserBalance = balance.balance;

  // BRINGS IN THE USER EMAIL

  const Email = JSON.parse(window.localStorage.getItem("user"));
  const UserEmail = Email.email;

  return (
    <div>
      <Card className="text-center" bg={"dark"} text={"light"}>
        <Card.Header>
          {" "}
          <h1>
            <u>-- ACCOUNT EMAIL AND BALANCE --</u>
          </h1>{" "}
        </Card.Header>
        <Card.Body>
          <Card.Title>Balance: </Card.Title> <br />
          <div className="balance">
            {" "}
            <Card.Text>{UserBalance}</Card.Text>
          </div>{" "}
          <br />
          <Card.Title>Email: </Card.Title> <br />
          <div className="balance">
            {" "}
            <Card.Text>
              {" "}
              <h1>{UserEmail}</h1>{" "}
            </Card.Text>
          </div>{" "}
        </Card.Body>
      </Card>
    </div>
  );
}
