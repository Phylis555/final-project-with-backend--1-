import React from 'react'
import swal from "sweetalert";
import { useParams, useNavigate } from 'react-router-dom'
import { removeRequest } from '../../api/requester.api';
import { getCookie } from '../common/getCookie'

export default function ViewSelectedRequest({requestData}) {

    const { requesterId } = useParams();
    const navigate = useNavigate();
    console.log(requesterId)

    const deleteRequest = (e) => {
        e.preventDefault();
        swal({
          title: "שים לב",
          text: "אם תסיר את הקשה, כל התרומות שנאספו עד כה יאבדו ולא תוכל לשחזר אותן",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            console.log(requesterId)
            removeRequest(requesterId).then(res => {
              swal("הבקשה נמחקה", {
                icon: "success",
              });
              navigate("/requester/all/requests");
            }).catch(err => {
              swal("Something went wrong!", {
                icon: "error",
              });
            })
          }
        });
      }

    return (
        <div dir="rtl">
            <h3>{requestData.title}</h3>
            <div className="row">
                <div className="col-8">
                    <div className="card-deck">
                        <div className="card">
                            <img src={requestData.requestImage} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <div className='row border-bottom'>
                                    <h5 className="text-normal"><i className="bi bi-person-circle"></i>בקשה זו נוצרה ע"י  {requestData.fname} {requestData.lname} </h5>
                                </div>
                                <div className='row border-bottom'>
                                    <p className="card-text">{requestData.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {requestData.userId === getCookie('uId')
                        ? (
                            <div className="d-flex justify-content-center mt-4">
                                <button type="button" onClick={deleteRequest} className="btn btn-danger">מחק בקשה </button>
                            </div>) : null
                    }

                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className='row border-bottom'>
                                <h5 className="card-title"><center>צור קשר:</center></h5>
                            </div>

                            <div className='row'>
                                <div className='col-2 ms-2'>
                                    <h3><i className="bi bi-person-circle"></i></h3>
                                </div>
                                <div className='col-9 ps-0'>
                                    <h6 className='pt-2'>{requestData.fname} {requestData.lname}</h6>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-2 ms-2'>
                                    <h3><i className="bi bi-geo-alt-fill"></i></h3>
                                </div>
                                <div className='col-9 ps-0'>
                                    <h6 className='pt-2'>{requestData.address}</h6>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-2 ms-2'>
                                    <h3><i className="bi bi-phone-fill"></i></h3>
                                </div>
                                <div className='col-9 ps-0'>
                                    <h6 className='pt-2'>{requestData.tpno}</h6>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-2 ms-2'>
                                    <h3><i className="bi bi-envelope-open-fill"></i></h3>
                                </div>
                                <div className='col-9 ps-0'>
                                    <h6 className='pt-2'>{requestData.email}</h6>
                                </div>
                            </div>

                            <div className='row border-top'>
                                <h6 className="card-text"><center>שתף את הבקשה</center></h6>
                            </div>

                            <div className="d-flex justify-content-center">
                                <a href="">
                                    <h3><i className="bi bi-facebook me-4"></i></h3>
                                </a>
                                <a href="">
                                    <h3><i className="bi bi-twitter me-4"></i></h3>
                                </a>
                                <a href="">
                                    <h3><i className="bi bi-instagram me-4"></i></h3>
                                </a>
                                <a href="">
                                    <h3><i className="bi bi-whatsapp me-4"></i></h3>
                                </a>   
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
