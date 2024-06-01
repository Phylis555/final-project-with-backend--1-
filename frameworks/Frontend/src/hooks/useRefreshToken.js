// import axios from '../api/axios';
// import useAuth from './useAuth';

// const useRefreshToken = () => {
//     const { setAuth } = useAuth();

//     const refresh = async () => {
//         const response = await axios.get('/refresh', {
//             withCredentials: true
//         });
//         // Update the auth state with the new access token
//         setAuth(prev => {
//             console.log(JSON.stringify(prev));
//             console.log(response.data.accessToken);
//             return { ...prev, accessToken: response.data.accessToken }
//         });
//         return response.data.accessToken;
//     }
//     // Return the refresh function
//     return refresh;
// };

// export default useRefreshToken;
