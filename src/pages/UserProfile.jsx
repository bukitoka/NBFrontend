import { logout } from '../tools/auth'
import useAuthStore from "../store/authStore";
import api from '../tools/api';
import { useState, useEffect } from 'react';

const UserProfile = () => {

    const allUserData = useAuthStore((state) => state.allUserData);
    const [userDetails, setUserDetails] = useState({});

    // fetch user details
    const fetchUserDetails = async () => {
        const { data, error } = await api.get('/api/account/' + allUserData + '/');
        if (!error) {
            setUserDetails(data);
        } else {
            console.log(error);
        }
    };

    const handleLogout = async () => {
        const { error } = await logout();
        if (!error) {
            window.location.reload();
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <>
            <div>UserProfile</div>
            {
                userDetails && (
                    <>
                        <ul>
                            <li>Email: {userDetails.email}</li>
                            <li>First Name: {userDetails.first_name}</li>
                            <li>Last Name: {userDetails.last_name}</li>
                            <li>Avatar: {userDetails.avatar ? userDetails.avatar : 'No Avatar'} </li>
                        </ul>
                    </>
                )
            }

            <br />

            <button onClick={handleLogout}>logout</button>
        </>
    );
}

export default UserProfile

