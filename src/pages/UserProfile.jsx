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
      {/* <div>UserProfile</div>
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

            <button onClick={handleLogout}>logout</button> */}

      <div class="h-screen w-full bg-zinc-100 p-6">
        <div class="grid gap-6 lg:flex">
          <div class="grid w-full grid-cols-1 lg:w-2/5 h-1/5">
            <div class="grid-cols-1 rounded-xl border bg-white p-8 text-center">
              <div class="flex justify-center">
                <div class="rounded-full bg-slate-800 p-2">
                  <img class="h-40 w-40 rounded-full" src="https://images.unsplash.com/photo-1694878982063-9c41c1d94f4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" alt="" srcset="" />
                </div>
              </div>
              <div class="mt-8">
                <span class="text-lg font-bold">Kusuma J</span>
              </div>
            </div>
            <div class="mt-6 rounded-xl border bg-white p-8">
              <div class="hidden lg:block">Desktop View</div>
              <div class="block lg:hidden">Mobile View</div>
            </div>
          </div>
          <div class="w-full h-screen rounded-xl border bg-white p-6 lg:w-3/5">03</div>
        </div>
      </div>


    </>
  );
}

export default UserProfile

