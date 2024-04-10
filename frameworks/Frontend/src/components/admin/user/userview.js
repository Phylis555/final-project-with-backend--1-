import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";

const UserView = (user) => {
    const {id} = useParams();
    const location = useLocation();
    const { userData } = location.state;
    console.log(userData);

    const onDelete = ()=>{
        swal({
            title: "Are you sure?",
            text: "The Donation Request Will be Rejected",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              axios
                .delete(`http://localhost:8070/admin/deleteuser/${id}`)
                .then(() => {
                  if (willDelete) {
                    swal("The Donation Request Has Been Rejected!", { icon: "success" })
                    setTimeout(function () {
                      window.location.reload()
                    }, 3000)
                  } else {
                    swal("File Is Not Deleted")
                  }
                })
            }
          })
    }

    // const handleDelete= async()=>{
    //     try{
    //         // const data=
    //         await axios.get(`http://localhost:8070/admin/deleteUser/${id}`);

    //     }catch(e){
    //         console.log(e)
    //     }
    // }

    // React.useEffect(async ()=>{
    //     handleDelete();
    // },[]);
    // const handleDelete = async () => {
    //     try {
    //         await axios.delete(`http://localhost:8070/admin/deleteUser/${id}`);
    //         // Optionally perform any cleanup or UI updates after deletion
    //         console.log('User deleted successfully');
    //         // Redirect the user to a different route programmatically
    //         // Example: window.location.href = '/users';
    //     } catch (error) {
    //         console.error('Error deleting user:', error);
    //         // Handle error (e.g., show error message to the user)
    //     }
    // };

    return (
        <div>
        <h2>User Details</h2>
        <p><strong>User ID:</strong> {id}</p>
        <p><strong>First Name:</strong> {userData.firstName}</p>
        <p><strong>Last Name:</strong> {userData.lastName}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Contact Number:</strong> 0{userData.contactNumber}</p>

        <button className="btn btn-danger" onClick={onDelete}>
            Delete User
        </button>
        </div>
    );
};

export default UserView;