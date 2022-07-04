import BankImg from "./images/bank-img.jpg";
import "./Home.css";

export default function Home() {
  const balance = JSON.parse(window.localStorage.getItem("balance"));
  const UserBalance = balance.balance;

  const Email = JSON.parse(window.localStorage.getItem("user"));
  const UserEmail = Email.email;

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 col-xl-7 mb-lg-0 py-5 py-md-6">
          <div className="lc-block mb-3 mb-md-5 lh-1">
            <div editable="rich">
              <h1>
                {" "}
                <u>Welcome to The Bad Bank Website</u>{" "}
              </h1>
            </div>
          </div>
          {/* / balance */}
          <div>
            <h2>
              Your balance is: <u>{UserBalance}</u>{" "}
            </h2>
          </div>
        </div>
        {/* description */}
        <div className="col-12 col-md-6 col-xl-5">
          <div className="lc-block px-md-4 px-lg-5 lh-lg">
            <div editable="rich">
              <p>
                Hello {UserEmail}, Click on the deposit button to add money into
                your account and click the withdraw button to remove money from
                your account. If you want to see your user info or balance you
                can click on the Balance and Account Info button.
              </p>
            </div>
          </div>
        </div>
        {/* img */}
      </div>
      <div className="row">
        <div className="col-md-12 g-0">
          <div className="lc-block">
            <img
              className="img-fluid w-100"
              src={BankImg}
              alt="The bank"
              style={{ objectFit: "cover", maxHeight: "40vh" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
