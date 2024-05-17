import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { donateFund } from "../../../api/fund.api";
import { getCookie } from "../../common/getCookie";
import { cardValidation } from "../cardValidation";

export default function DonateFund({ organizationID, fundID, fund }) {
  const [formErrors, setFormErrors] = useState({});
  const [cardDetails, setCardDetails] = useState({});
  const [donationAmount, setDonationAmount] = useState();
  const [isSubmit, setIsSubmit] = useState(false);

  const handleDonation = (e) => {
    e.preventDefault();
    // console.log(cardDetails);
    setFormErrors(cardValidation(cardDetails));
    if (donationAmount <= 0 || donationAmount === undefined) {
      setFormErrors({
        ...formErrors,
        donationAmount: "סכום התרומה חייב להיות גדול מאפס ",
      });
    } else if (donationAmount > fund.budget - fund.currentAmount) {
      setFormErrors({
        ...formErrors,
        donationAmount: "סכום התרומה חייב להיות נמוך מהתקציב הנותר",
      });
    }
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log("Donation successful");
      donateFund(fundID, {
        userID: getCookie("uId"),
        fundID: fundID,
        amount: donationAmount,
        organizationID: organizationID,
      })
        .then((res) => {
          setCardDetails({});
          setDonationAmount();
          swal("התרומה הצליחה", "", "success")
            .then((willLogin) => {
              if (willLogin) {
                window.location.reload();
              }
            });
        })
        .catch((err) => {
          console.log(err);
          swal("התרומה נכשלה", "", "error");
        });
    } else {
      setIsSubmit(false);
    }
  }, [formErrors, isSubmit]);

  return (
    <div>
      <form className="text-start" dir="rtl">
        <label className="form-label">סכום (₪)</label>
        <div className="input-group input-group-outline mb-1">
          <input
            type="number"
            className="form-control"
            placeholder="הכנס סכום לתרומה"
            value={donationAmount}
            onChange={(e) => {
              setDonationAmount(e.target.value);
            }}
          />
        </div>
        <div className="text-danger form-label mb-3">
          {formErrors.donationAmount}
        </div>

        <h5 className="form-group text-center pt-2">פרטי כרטיס אשראי</h5>

        <label className="form-label">שם בעל הכרטיס</label>
        <div className="input-group input-group-outline mb-1">
          <input
            type="text"
            className="form-control"
            placeholder="שם מלא"
            value={cardDetails["name"]}
            onChange={(e) => {
              setCardDetails({ ...cardDetails, name: e.target.value });
            }}
          />
        </div>
        <div className="text-danger form-label mb-3">{formErrors.name}</div>

        <label className="form-label">מספר כרטיס</label>
        <div className="input-group input-group-outline mb-1">
          <input
            type="text"
            className="form-control"
            placeholder="מספר כרטיס בעל 16 ספרות"
            value={cardDetails["cardNumber"] }
            onChange={(e) => {
              setCardDetails({
                ...cardDetails,
                cardNumber: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim() // Add space every 4 digits
              });}
            }
          />
        </div>
        <div className="text-danger form-label mb-3">
          {formErrors.cardNumber}
        </div>

        <div className="row">
          <div className="col-6">
            <label className="form-label">תוקף </label>
            <div className="input-group input-group-outline mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="MM / YY"
                value={cardDetails["cardExpiry"]}
                onChange={(e) => {
                  let value = e.target.value;
                  // If length is 2 and there's no "/" yet, append it automatically
                  if (value.length === 2 && value.indexOf('/') === -1) {
                    value += '/';
                  }
                  // If length is more than 5, trim it
                  if (value.length > 5) {
                    value = value.substr(0, 5);
                  }
                  setCardDetails({
                    ...cardDetails,
                    cardExpiry: value,
                  });
                }}
             
              />
            </div>
            <div className="text-danger form-label mb-3">
              {formErrors.cardExpiry}
            </div>
          </div>

          <div className="col-6">
            <label className="form-label">CVV</label>
            <div className="input-group input-group-outline mb-1">
              <input
                type="password"
                className="form-control"
                placeholder="***"
                value={cardDetails["cvv"]}
                onChange={(e) => {
                  setCardDetails({ ...cardDetails, cvv: e.target.value });
                }}
              />
            </div>
            <div className="text-danger form-label mb-3">{formErrors.cvv}</div>
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-lg-4 col-md-4 col-sm-4">
            <button
              type="button"
              onClick={handleDonation}
              className="btn bg-gradient-primary w-100 my-4 mb-2"
            >
              לתרומה
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
