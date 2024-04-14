import React, { useContext } from 'react'
import { multiStepContext } from './StepContex'

export default function StepFour() {
    const { setCurrentStep, userData, setUserData, submitData, formErrors } = useContext(multiStepContext)
    return (
        <>
            <div className="card-body" dir="rtl">
                <form className="text-start">
                    <div className="form-group text-center pb-3">יצירת סיסמה</div>
                    <div className="row input-group input-group-outline m-0 px-4 pe-3"> 

                        {/* <label className="form-label">סיסמה</label> */}
                        <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ps-4">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="סיסמה"
                                value={userData['password']}
                                onChange={(e) => { setUserData({ ...userData, "password": e.target.value }) }} />
                        </div>
                        <div className="text-danger form-label mt-4">
                            {formErrors.password}
                        </div>
                    </div>
                    <div className="row input-group input-group-outline m-0 px-4 pe-3"> 

                        {/* <label className="form-label">אימות סיסמה</label> */}
                        <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ps-4">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="אימות סיסמה"
                                value={userData['repassword']}
                                onChange={(e) => { setUserData({ ...userData, "repassword": e.target.value }) }} />
                        </div>
                        <div className="text-danger form-label mt-4">
                            {formErrors.repassword}
                        </div>
                    </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="flexCheckDefault"
                                value={userData['terms']}
                                onChange={(e) => { setUserData({ ...userData, "terms": e.target.checked }) }} />
                            <label className="form-check-label me-3" htmlFor="flexCheckDefault">
                                אני מסכים עם כל התנאים, ההגבלות ולמדיניות הפרטיות
                            </label>
                            <div className="text-danger form-label mb-3">
                                {formErrors.terms}
                            </div>
                        </div>
                    <div className="row d-flex justify-content-center">
                        <div className='col-lg-4 col-md-4 col-sm-4'>
                            <button type="button" onClick={submitData} className="btn bg-gradient-primary w-100 my-4 mb-2">שלח</button>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-4'>
                            <button type="button" onClick={() => setCurrentStep(3)} className="btn bg-gradient-secondary w-100 my-4 mb-2">הקודם</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        </>
    )
}
