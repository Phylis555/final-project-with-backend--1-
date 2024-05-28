import { useContext } from "react"
import { multiStepContext } from "./StepContex"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';

export default function StepOne() {
    const { setCurrentStep, userData, setUserData, formErrors } = useContext(multiStepContext)

    return (
            <div  dir="rtl" className="card-body" >
                <form className="text-start" >
                    <div className="form-group text-center pb-3">פרטי הארגון</div>

                    {/* Organization Name */}
                    <div className="row input-group input-group-outline m-0 px-4 pe-3"> 
                        <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ps-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="שם הארגון"
                                value={userData['name']}
                                onChange={(e) => { setUserData({ ...userData, "name": e.target.value }) }} />
                        </div>
                        <div className="text-danger form-label mb-3">
                            {formErrors.name}
                        </div>
                    </div>

                    {/* Organization Address */}
                    <div className="row input-group input-group-outline m-0 px-4 pe-3"> 
                        <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ps-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="כתובת"
                                value={userData['address']}
                                onChange={(e) => { setUserData({ ...userData, "address": e.target.value }) }} />
                        </div>
                        <div className="text-danger form-label mb-3">
                            {formErrors.address}
                        </div>
                    </div>

                  {/* Organization Country */}
                    <div className="row input-group input-group-outline m-0 px-4 pe-3"> 
                        <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ps-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="מדינה"
                                value={userData['country']}
                                onChange={(e) => { setUserData({ ...userData, "country": e.target.value }) }} />
                        </div>
                        <div className="text-danger form-label mb-3">
                            {formErrors.country}
                        </div>
                    </div>

                    {/* Organization Zip Code */}
                    <div className="row input-group input-group-outline m-0 px-4 pe-3"> 
                        <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ps-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="מיקוד"
                                value={userData['zipCode']}
                                onChange={(e) => { setUserData({ ...userData, "zipCode": e.target.value }) }} />
                        </div>
                        <div className="text-danger form-label mb-3">
                            {formErrors.zipCode}
                        </div>
                    </div>

                    {/* Organization Contact Number */}
                    <div className="row input-group input-group-outline m-0 px-4 pe-3"> 
                        <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ps-4">
                            <input
                                type="contact"
                                className="form-control"
                                placeholder="מספר ליצירת קשר"
                                value={userData['contactNumber']}
                                onChange={(e) => { setUserData({ ...userData, "contactNumber": e.target.value }) }} />
                        </div>
                        <div className="text-danger form-label mb-3">
                            {formErrors.contactNumber}
                        </div>
                    </div>

                    {/* Organization Email */}
                    <div className="row input-group input-group-outline m-0 px-4 pe-3"> 
                        <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ps-4">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={userData['email']}
                                onChange={(e) => { setUserData({ ...userData, "email": e.target.value }) }} />
                        </div>
                        <div className="text-danger form-label mb-3">
                            {formErrors.email}
                        </div>
                    </div>

                    {/* Organization Registration Number */}
                    <div className="row input-group input-group-outline m-0 px-4 pe-3"> 
                        <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ps-4">
                        
                            <input
                                type="text"
                                className="form-control"
                                placeholder="מספר ארגון"
                                value={userData['registrationNumber']}
                                onChange={(e) => { setUserData({ ...userData, "registrationNumber": e.target.value }) }} />
                        </div>
                        <div className="text-danger form-label mb-3">
                            {formErrors.registrationNumber}
                        </div>
                    </div>

                    {/* Organization Registration Date */}
                    <div className="row input-group input-group-outline m-0 px-4 pe-3"> 
                         <label className="form-label"> תאריך רישום</label>
                        <div className="input-group input-group-outline mb-1 col-md-6 mb-4 ">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    label="Registration Date"
                                    placeholder="תאריך רישום"
                                    value={userData['registrationDate']}
                                    maxDate={new Date()}
                                    onChange={(newValue) => {
                                        setUserData({ ...userData, "registrationDate": newValue.$d });
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            <input ref={inputRef} {...inputProps} placeholder='' className="form-control ms-2" readOnly />
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="text-danger form-label mb-3">
                            {formErrors.registrationDate}
                        </div>
                    </div>  

                    {/* Next Step Button */}                 
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-4 col-md-4 col-sm-4">
                            <button type="button" onClick={() => setCurrentStep(2)} className="btn bg-gradient-primary w-100 my-4 mb-2">הבא</button>
                        </div>
                    </div>
                </form>
            </div>
       
    )
}