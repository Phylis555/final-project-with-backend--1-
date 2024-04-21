import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "../dashTable/dashTable.module.css";
import swal from "sweetalert";
import axios from "axios";
import { getAuthHeader } from "../../common/authHeader";

export default function GetRequestedDonations() {
  
  const toggleSidenav = (e) => {
    e.preventDefault();
    document.body.classList.remove("g-sidenav-pinned");
  };
  const navigate = useNavigate();
  // const navigateTo=()=> useNavigate.push('/admin/orgview/id')

  const [datatable, setDatatable] = useState([]);
  const [search, setSearch] = useState("");

  const getReqOrgList = async () => {
    try {
      const data = await axios.get(`http://localhost:8070/admin/getpdon/`,getAuthHeader());
      setDatatable(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getReqOrgList();
  }, []);

  const onView = (id) => {
    const oid = id;
    navigate(`/admin/viewreqfund/${oid}`);
    console.log(oid);
  };

  const onAccept = (id) => {
    swal({
      title: "שים לב",
      text: "בקשת התרומה תאושר",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.put(`http://localhost:8070/admin/updostauts/${id}`,getAuthHeader()).then(() => {
          if (willDelete) {
            swal("בקשת התרומה התקבלה בהצלחה", {
              icon: "success",
            });
            setTimeout(function () {
              window.location.reload();
            }, 3000);
          } else {
            swal("התרומה לא התקבלה");
          }
        });
      }
    });
  };

  const onDelete = (id) => {
    swal({
      title: "שים לב",
      text: "בקשת התרומה תדחה",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(`http://localhost:8070/admin/rejectdonation/${id}`,getAuthHeader())
          .then(() => {
            if (willDelete) {
              swal("בקשת התרומה נדחתה", {
                icon: "success",
              });
              setTimeout(function () {
                window.location.reload();
              }, 3000);
            } else {
              swal("התרומה לא נדחתה");
            }
          });
      }
    });
  };

  return (
    <>

      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " dir="rtl">
        {/* <NavButton /> */}
        <div className="container-fluid py-4" onClick={toggleSidenav}>
          <div className="row">
            <h2>בקשות לתרומות ציוד</h2>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-8 my-3 me-4">
            <div className="input-group input-group-outline bg-white">
              <input
                  className="form-control"
                  type="text"
                  placeholder="חפש"
                  aria-label="Search"
                  onChange={(e) => {
                      setSearch(e.target.value);
                  }}
              />{" "}
            </div>
          </div> 
        <div className="row me-4">
          <div className={classes.DashTable}>
            <div className={classes.TableBack}>
              <table className={classes.Table}>
                <tr>
                  <th>כותרת</th>
                  <th>Email</th>
                  <th>תיאור</th>
                  <th id={classes.ActionSec}>פעולה</th>
                </tr>
                {datatable.filter((org) => {
                  if (search === "") {
                      return org;
                  } else {
                      return Object.values(org).some(value =>
                          value.toString().toLowerCase().includes(search.toLowerCase())
                      );
                  }
                }).map((org) => {
                    return (
                      <tr>
                        <td>{org.donationTitle}</td>
                        <td>{org.email}</td>
                        <td>{org.donationDescription}</td>
                        <td>
                          <div className={classes.ActionBtnSec}>
                          <button className="btn btn-outline-success"
                            onClick={() => {
                                onAccept(org._id);
                              }}
                            >
                              אשר
                          </button>
                            <Link
                              to={"/donator/view/" + org._id}
                              state={{
                                fromAdmin: true,
                                req:true
                              }}
                            >
                              <button className="btn btn-outline-info">
                                בדוק
                              </button>
                            </Link>

                           
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => {
                                onDelete(org._id);
                              }}
                            >
                              דחה
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
