import React, { useContext } from 'react'
import { multiStepContext } from './StepContex'

export default function StepTwo() {
    const { setCurrentStep, userData, setUserData, formErrors } = useContext(multiStepContext)
    return (
        <>
            <div className="card-body" dir="rtl">
                <form className="text-start">
                    <div className="form-group text-center pb-3">מנהל הארגון</div>
                <div className="row input-group input-group-outline m-0 px-4 pe-3"> 

                    <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ps-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="שם מלא"
                            value={userData['presidentName']}
                            onChange={(e) => { setUserData({ ...userData, "presidentName": e.target.value }) }} />
                    </div>
                    <div className="text-danger form-label mt-4">
                        {formErrors.presidentName}
                    </div>
                </div>
                <div className="row input-group input-group-outline m-0 px-4 pe-3"> 

                    {/* <label className="form-label">Email</label> */}
                    <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ps-4">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={userData['presidentEmail']}
                            onChange={(e) => { setUserData({ ...userData, "presidentEmail": e.target.value }) }} />
                    </div>
                    <div className="text-danger form-label mt-4">
                        {formErrors.presidentEmail}
                    </div>
                </div>
                <div className="row input-group input-group-outline m-0 px-4 pe-3"> 

                    {/* <label className="form-label"></label> */}
                    <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ps-4">
                        <input
                            type="contact"
                            className="form-control"
                            placeholder="מספר טלפון"
                            value={userData['presidentContactNumber']}
                            onChange={(e) => { setUserData({ ...userData, "presidentContactNumber": e.target.value }) }} />
                    </div>
                    <div className="text-danger form-label mt-4">
                        {formErrors.presidentContactNumber}
                    </div>
                </div>
                <div className="form-group text-center pb-3"> מזכירות הארגון (איש קשר של הארגון)</div>
                <div className="row input-group input-group-outline m-0 px-4 pe-3">
                    {/* <label className="form-label">שם</label> */}
                    <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ps-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="שם"
                            value={userData['secretaryName']}
                            onChange={(e) => { setUserData({ ...userData, "secretaryName": e.target.value }) }} />
                    </div>
                    <div className="text-danger form-label mt-4">
                        {formErrors.secretaryName}
                    </div>
                </div>
                <div className="row input-group input-group-outline m-0 px-4 pe-3">
                    {/* <label className="form-label">Email</label> */}
                    <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ps-4">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={userData['secretaryEmail']}
                            onChange={(e) => { setUserData({ ...userData, "secretaryEmail": e.target.value }) }} />
                    </div>
                    <div className="text-danger form-label mt-4">
                        {formErrors.secretaryEmail}
                    </div>
                </div>
                <div className="row input-group input-group-outline m-0 px-4 pe-3">

                    {/* <label className="form-label"></label> */}
                    <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ps-4">
                        <input
                            type="contact"
                            className="form-control"
                            placeholder="מספר טלפון"
                            value={userData['secretaryContactNumber']}
                            onChange={(e) => { setUserData({ ...userData, "secretaryContactNumber": e.target.value }) }} />
                    </div>
                    <div className="text-danger form-label mt-4">
                        {formErrors.secretaryContactNumber}
                    </div>
                </div>
                    <div className="row d-flex justify-content-center">
                    <div className='col-lg-4 col-md-4 col-sm-4'>
                            <button type="button" onClick={() => setCurrentStep(3)} className="btn bg-gradient-primary w-100 my-4 mb-2">הבא</button>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-4'>
                            <button type="button" onClick={() => setCurrentStep(1)} className="btn bg-gradient-secondary w-100 my-4 mb-2">הקודם</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        </>
    )
}
