// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const RequireAuth = ({ allowedRoles }) => {
//      // Retrieve authentication status and user roles
//     const { auth } = useAuth();
//      // Get the current location
//     const location = useLocation();

//       // Check if user roles match the allowed roles
//     const isAuthenticated = auth?.roles?.find(role => allowedRoles?.includes(role));


//     // If user is authenticated and has the required roles, render the child components
//     // If user is authenticated but doesn't have the required roles, navigate to unauthorized page
//     // If user is not authenticated, redirect to sign-in page
    
//     return (
//         isAuthenticated
//             ? <Outlet /> // Render child components
//             : auth?.user
//                 ? <Navigate to="/unauthorized" state={{ from: location }} replace />
//                 : <Navigate to="requester/signin" state={{ from: location }} replace />

//     );
// }

// export default RequireAuth;