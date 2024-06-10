import React, { useEffect, useState } from 'react'
import { newFund } from '../../../api/fund.api';
import NewFund from '../../../pages/fund/newFund';
import { formValidationStep1, formValidationStep2 } from '../formValidation';
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../common/getCookie';

export const multiStepContext = React.createContext()

export default function NewFundContext() {
    const navigate = useNavigate()
     // State variables
    const [currentStep, setCurrentStep] = useState(1);
    const [fundData, setFundData] = useState({ organizationID: getCookie("uId"),   title: '',target: '',description: '',endingDate: null, budget: ''});
    const [fundImage, setFundImage] = useState(null);
    const [formErrorsStep1, setFormErrorsStep1] = useState({});
    const [formErrorsStep2, setFormErrorsStep2] = useState({});
    const [isNext, setIsNext] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    // Function to handle form submission in step 2
    function submitData(e) {
        e.preventDefault();
        setFormErrorsStep2(formValidationStep2(fundData))
        setIsSubmit(true);
    }
    // Function to handle the next button click in step 1
    function handleNext(e) {
        e.preventDefault();
        setFormErrorsStep1(formValidationStep1(fundData))
        setIsNext(true);
    }

   // Effect to handle navigation to step 2 after successful validation of step 1
    useEffect(() => {
        if (Object.keys(formErrorsStep1).length === 0 && isNext) {
            setCurrentStep(2);
        } else {
            setCurrentStep(1);
            setIsNext(false);
        }
    }, [formErrorsStep1, isNext])

    // To handle the submit button in step 2
    useEffect(() => {
        if (Object.keys(formErrorsStep2).length === 0 && isSubmit) {
            newFund(fundData).then(res => {
                swal(
                    "הבקשה נוצרה בהצלחה",
                    "",
                    "success"
                ).then((value) => {
                    navigate('/organization/funds')
                })
            }).catch(err => {
                console.log(err);
                swal(
                    "נכשל ביצירת הבקשה",
                    err.response.data.message,
                    "error"
                )
            })
        } else {
            setIsSubmit(false);
        }
    }, [formErrorsStep2, isSubmit])


 
    
    return (
        <div>
             {/* Providing context to the NewFund component */}
            <multiStepContext.Provider value={{ currentStep, setCurrentStep, fundData, setFundData, submitData, fundImage, setFundImage, formErrorsStep1, formErrorsStep2, handleNext }}>
                <NewFund />
            </multiStepContext.Provider>
        </div>
    )
}
