import React from "react";
import { HashRouter, Route } from "react-router-dom";

import NavBar from "./Navbar";
import Home from "./Home";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import Balance from "./Balance";
import Data from "./data";

export default function Bank() {
  return (
    <div>
      <HashRouter>
        <div>
          <NavBar />

          <div className="container" style={{ padding: "20px" }}>
            <Route path="/" exact component={Home} />
            <Route path="/deposit" component={Deposit} />
            <Route path="/withdraw" component={Withdraw} />
            <Route path="/balance" component={Balance} />
            <Route path="/data" component={Data} />
          </div>
        </div>
      </HashRouter>
    </div>
  );
}
