import React, {useContext} from 'react'
import { multiStepContext } from '../request/stepContex'

export default function RequestStepOne() {
  const { requestData, setRequestData, formErrorsStep1, handleNext } = useContext(multiStepContext)
  return (
    <div>
      <h4 className="pt-3 ms-4">בקשה לתרומה כספית</h4>
      

    <div class="container d-flex justify-content-center pt-4 pb-5">
      
    <div className="card z-index-0 fadeIn3 fadeInBottom ">
    <div className="card-body" dir="rtl">
        <form class="form-control"> 
          <p class="h3 fw-bold text-center mb-2 pt-4"> יצירת בקשה חדשה </p>
          
          <p class="text-center d-flex me-3 pt-3 text-muted fw-bold "> מידע אישי על המבקש </p> 

            <div class="row input-group input-group-outline m-0 pb-4 px-4"> 
              <div class="col-md-6 pe-0"> 
                <input class="form-control" 
                type="text"
                placeholder='שם פרטי'
                value={requestData['fname']}
                onChange={(e) => { setRequestData({ ...requestData, "fname": e.target.value }) }}
                />
                <div className="text-danger p-0 m-0">
                  {formErrorsStep1.fname}
                </div>
              </div>
              

              <div class="col-md-6 ps-0">
                <input class="form-control" 
                type="text"
                placeholder='שם משפחה'
                value={requestData['lname']}
                onChange={(e) => { setRequestData({ ...requestData, "lname": e.target.value }) }}
                />
                <div className="text-danger p-0 m-0">
                  {formErrorsStep1.lname}
                </div>
              </div> 
            </div>
            
          <div className='row pb-3 px-4'>
            <div class="input-group input-group-outline"> 
              <input type="text" 
                    placeholder="מספר טלפון" 
                    class="form-control"
                    value={requestData['tpno']}
                    onChange={(e) => { setRequestData({ ...requestData, "tpno": e.target.value }) }}
                    />
            </div> 
              <div className="text-danger">
                  {formErrorsStep1.telephoneNo}
              </div>
          </div>
            <div class="row input-group input-group-outline m-0 px-4"> 
              <div class="col-md-6 mb-4 pe-0"> 
                <input class="form-control" 
                        type="text" 
                        placeholder="מדינה"
                        value={requestData['country']}
                        onChange={(e) => { setRequestData({ ...requestData, "country": e.target.value }) }}
                        />
                      <div className="text-danger">
                          {formErrorsStep1.country}
                      </div>
              </div>
              
              <div class="col-md-6 mb-4 ps-0">
                <input class="form-control" 
                      type="text" 
                      placeholder="מיקוד"
                      value={requestData['zipcode']}
                      onChange={(e) => { setRequestData({ ...requestData, "zipcode": e.target.value }) }}
                      />
                  <div className="text-danger">
                        {formErrorsStep1.zipcode}
                  </div>
              </div>
               
            </div>
            <div className='row pb-3 px-2'>
            <div class="input-group input-group-outline px-4"> 
              <input type="text" 
              placeholder="כתובת" 
              class="form-control"
              value={requestData['address']}
              onChange={(e) => { setRequestData({ ...requestData, "address": e.target.value }) }}
              />
              </div>
              <div className="text-danger ms-3">
                  {formErrorsStep1.address}
              </div>
            </div> 


            <div className='row pb-3 px-2'>
            <div class="input-group input-group-outline px-4"> 
              <input type="email" 
              placeholder="Email" 
              class="form-control"
              value={requestData['email']}
              onChange={(e) => { setRequestData({ ...requestData, "email": e.target.value }) }}
              /> 
            </div> 
            <div className="text-danger ms-3">
                  {formErrorsStep1.email}
            </div>
            </div>

            <div className='row pb-3 px-2'>
            <div class="input-group input-group-outline px-4"> 
              <input type="text" 
              placeholder="מספר ליצירת קשר" 
              class="form-control"
              value={requestData['contactno']}
              onChange={(e) => { setRequestData({ ...requestData, "contactno": e.target.value }) }}
              /> 
            </div> 
            <div className="text-danger ms-3">
                  {formErrorsStep1.contactNo}
            </div>
            </div>
          
           <div class="row"> 
              <div class="mb-3 d-flex justify-content-center"> 
                <button type="button" class="btn btn-primary d-block" onClick={handleNext}> הבא </button>
              </div> 
           </div>
           
        </form>
        </div>
      </div>
      </div>
  </div>
  )
}
