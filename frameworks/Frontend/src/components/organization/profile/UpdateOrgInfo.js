import React, { useEffect, useState } from 'react'
import { getOrganizationByID, updateOrganization } from '../../../api/organization.api';
import { formValidationStep1 } from '../formValidation';

export default function UpdateOrgInfo({ organizationId }) {
  const [userData, setUserData] = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [alert, setAlert] = useState({})
  const [isSubmit, setIsSubmit] = useState(false);

    // Fetch organization data by ID
  useEffect(() => {
    getOrganizationByID(organizationId)
      .then((res) => {
        setUserData(res.data.organization);
      }).catch((err) => {
        console.log(err);
      })
  }, [organizationId]);

  // Handle form submission
  const handleUpdate = (e) => {
    e.preventDefault()
    setFormErrors(formValidationStep1(userData))
    setIsSubmit(true);
  }

  // Update organization data if there are no form errors
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      updateOrganization(organizationId, {
        name: userData.name,
        address: userData.address,
        country: userData.country,
        zipCode: userData.zipCode,
        contactNumber: userData.contactNumber,
        email: userData.email,
      })
        .then((res) => {
          setAlert({
            type: "success",
            message: res.data.message
          })
        }).catch((err) => {
          console.log(err);
          setAlert({
            type: "danger",
            message: err.response.data.message
          })
        })
      setIsSubmit(false);
    } else {
      setIsSubmit(false);
    }
  }, [formErrors, isSubmit])
// Close alert message
  const closeAlert = (e) => {
    e.preventDefault()
    setAlert({})
  }
  return (
    <>
      <div className="card-body " dir="rtl">
        {/* Display success or error alert */}
        {alert.type && alert.type === "success" ? (
            <div className="alert alert-success alert-dismissible text-white" role="alert">
              <span className="text-sm">{alert.message}</span>
              <button type="button" className="btn-close text-lg py-3 opacity-10" onClick={closeAlert}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ) : (
            alert.type && alert.type === "danger" ? (
              <div className="alert alert-danger alert-dismissible text-white" role="alert">
                <span className="text-sm">{alert.message}</span>
                <button type="button" className="btn-close text-lg py-3 opacity-10" onClick={closeAlert}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ) : null
          )
        }
        <form className="text-start">
          {/* Organization name */}
          <label className="form-label">שם הארגון</label>
          <div className="input-group input-group-outline mb-1">
            <input
              type="text"
              className="form-control"
              value={userData['name']||""}
              onChange={(e) => { setUserData({ ...userData, "name": e.target.value }) }} />
          </div>
          <div className="text-danger form-label mb-3">
            {formErrors.name}
          </div>
          {/* Organization address */}
          <label className="form-label">כתובת</label>
          <div className="input-group input-group-outline mb-1">
            <input
              type="text"
              className="form-control"
              value={userData['address']||""}
              onChange={(e) => { setUserData({ ...userData, "address": e.target.value }) }} />
          </div>
          <div className="text-danger form-label mb-3">
            {formErrors.address}
          </div>
          {/* Organization country */}
          <label className="form-label">מדינה</label>
          <div className="input-group input-group-outline mb-1">
            <input
              type="text"
              className="form-control"
              value={userData['country']||""}
              onChange={(e) => { setUserData({ ...userData, "country": e.target.value }) }} />
          </div>
          <div className="text-danger form-label mb-3">
            {formErrors.country}
          </div>
           {/* ZIP Code */}
          <label className="form-label">מיקוד</label>
          <div className="input-group input-group-outline mb-1">
            <input
              type="text"
              className="form-control"
              value={userData['zipCode']||""}
              onChange={(e) => { setUserData({ ...userData, "zipCode": e.target.value }) }} />
          </div>
          <div className="text-danger form-label mb-3">
            {formErrors.zipCode}
          </div>
          {/* Contact number */}
          <label className="form-label">מספר ליצירת קשר</label>
          <div className="input-group input-group-outline mb-1">
            <input
              type="contact"
              className="form-control"
              value={userData['contactNumber']||""}
              onChange={(e) => { setUserData({ ...userData, "contactNumber": e.target.value }) }} />
          </div>
          <div className="text-danger form-label mb-3">
            {formErrors.contactNumber}
          </div>
          {/* Email */}
          <label className="form-label">Email</label>
          <div className="input-group input-group-outline mb-1">
            <input
              type="email"
              className="form-control"
              value={userData['email']||""}
              onChange={(e) => { setUserData({ ...userData, "email": e.target.value }) }} />
          </div>
          <div className="text-danger form-label mb-3">
            {formErrors.email}
          </div>
          {/* Submit button */}
          <div className="row d-flex justify-content-center">
            <div className="col-lg-4 col-md-4 col-sm-4">
              <button type="button" onClick={handleUpdate} className="btn bg-gradient-primary w-100 my-4 mb-2">עדכן</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
