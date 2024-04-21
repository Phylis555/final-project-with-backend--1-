import React from 'react';
import { useParams, useLocation ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";
import { getAuthHeader } from "../../common/authHeader";

const UserView = () => {
    const { id } = useParams();
    const location = useLocation();
    const { userData } = location.state;
    const navigate = useNavigate()


    const onDelete = () => {
        swal({
            title: "שים לב",
            text: "המשתמש ימחק ולא היה ניתן לשחזר את הפרטים שלו",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios
                    .delete(`http://localhost:8070/admin/deleteuser/${id}`,getAuthHeader())
                    .then(() => {
                        if (willDelete) {
                            swal("המשתמש נמחק בהצלחה", { icon: "success" })
                            setTimeout(function () {
                                window.location.reload()
                            }, 3000)
                        } else {
                            swal("הקובץ לא נמחק")
                        }
                    })
            }
        })
    }

    return (
      <div dir="rtl" >
        <i className="bi bi-arrow-left-circle fs-4 m-4 cursor-pointer"
        onClick={() => navigate(-1)}> הקודם</i>
        <div className="card mx-auto mt-5 " dir="rtl" style={{ maxWidth: "600px" }}>
          
            <div className="card-header">
                <h2 className="text-center">פרטי המשתמש</h2>
            </div>
            <div className="card-body ">
                <p className="fs-5 "><strong>מספר משתמש:</strong> {id}</p>
                <p className="fs-5 "><strong>שם פרטי:</strong> {userData.firstName}</p>
                <p className="fs-5 "><strong>שם משפחה:</strong> {userData.lastName}</p>
                <p className="fs-5 "><strong>אימייל:</strong> {userData.email}</p>
                <p className="fs-5 "><strong>מספר טלפון:</strong> 0{userData.contactNumber}</p>
            </div>
            <div className="card-footer text-center">
                <button className="btn btn-danger fs-6" onClick={onDelete}>
                    מחק משתמש
                </button>
            </div>
        </div>
        </div>
    );
};

export default UserView;

// import React from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import swal from "sweetalert";

// const UserView = (user) => {
//     const {id} = useParams();
//     const location = useLocation();
//     const { userData } = location.state;
//     console.log(userData);

//     const onDelete = ()=>{
//         swal({
//             title: "Are you sure?",
//             text: "The Donation Request Will be Rejected",
//             icon: "warning",
//             buttons: true,
//             dangerMode: true,
//           }).then((willDelete) => {
//             if (willDelete) {
//               axios
//                 .delete(`http://localhost:8070/admin/deleteuser/${id}`)
//                 .then(() => {
//                   if (willDelete) {
//                     swal("The Donation Request Has Been Rejected!", { icon: "success" })
//                     setTimeout(function () {
//                       window.location.reload()
//                     }, 3000)
//                   } else {
//                     swal("File Is Not Deleted")
//                   }
//                 })
//             }
//           })
//     }

//     // const handleDelete= async()=>{
//     //     try{
//     //         // const data=
//     //         await axios.get(`http://localhost:8070/admin/deleteUser/${id}`);

//     //     }catch(e){
//     //         console.log(e)
//     //     }
//     // }

//     // React.useEffect(async ()=>{
//     //     handleDelete();
//     // },[]);
//     // const handleDelete = async () => {
//     //     try {
//     //         await axios.delete(`http://localhost:8070/admin/deleteUser/${id}`);
//     //         // Optionally perform any cleanup or UI updates after deletion
//     //         console.log('User deleted successfully');
//     //         // Redirect the user to a different route programmatically
//     //         // Example: window.location.href = '/users';
//     //     } catch (error) {
//     //         console.error('Error deleting user:', error);
//     //         // Handle error (e.g., show error message to the user)
//     //     }
//     // };

//     return (
//         <div>
//         <h2>User Details</h2>
//         <p><strong>User ID:</strong> {id}</p>
//         <p><strong>First Name:</strong> {userData.firstName}</p>
//         <p><strong>Last Name:</strong> {userData.lastName}</p>
//         <p><strong>Email:</strong> {userData.email}</p>
//         <p><strong>Contact Number:</strong> 0{userData.contactNumber}</p>

//         <button className="btn btn-danger" onClick={onDelete}>
//             Delete User
//         </button>
//         </div>
//     );
// };

// export default UserView;


