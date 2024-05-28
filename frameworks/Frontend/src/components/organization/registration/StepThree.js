import React, { useContext } from 'react'
import { multiStepContext } from './StepContex'
import { FileUploader } from "react-drag-drop-files";

export default function StepThree() {
  // Accessing multiStepContext
  const { setCurrentStep, userData, setUserData, imageFile, setImageFile, formErrors } = useContext(multiStepContext)
  // Allowed file types
  const fileTypes = ["JPEG", "JPG", "PNG"];

  // Convert file into base64
  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  // Handle file change
  const handleChange = (file) => {
    setImageFile(file);
    getBase64(file, (result) => {
      setUserData({ ...userData, "registrationCertificate": result })
    })
  }

  return (
    <>
      <div className="card-body">
        {/* File Upload Section */}
        <div className="form-group text-center pb-3">העלה תעודת רישום/לוגו של הארגון</div>
        <div className='text-center'>
          <div className='d-flex justify-content-center'>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
          </div>
          <p>{imageFile ? `File name: ${imageFile.name}` : "No files uploaded yet"}</p>
          <p>{imageFile ?
            <img className='rounded img-fluid w-50 mx-auto d-block' src={userData.registrationCertificate} alt={imageFile.name} /> : ""}</p>
        </div>
        {/* Display form errors */}
        <div className="text-danger form-label mb-3">
          {formErrors.registrationCertificate}
        </div>
        {/* Navigation Buttons */}
        <div className="row d-flex justify-content-center">
          <div className='col-lg-4 col-md-4 col-sm-4'>
            <button type="button" onClick={() => setCurrentStep(2)} className="btn bg-gradient-secondary w-100 my-4 mb-2">הקודם </button>
          </div>
          <div className='col-lg-4 col-md-4 col-sm-4'>
            <button type="button" onClick={() => setCurrentStep(4)} className="btn bg-gradient-primary w-100 my-4 mb-2">הבא</button>
          </div>
        </div>
      </div>
    </>
  )
}
