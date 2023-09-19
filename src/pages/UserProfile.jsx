import { logout } from '../tools/auth'
import useAuthStore from "../store/authStore";
import api from '../tools/api';
import { useState, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid'

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


  // State to track the selected menu item
  const [selectedMenuItem, setSelectedMenuItem] = useState('item1'); // Set an initial menu item

  // Function to handle menu item clicks
  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
  };
  // Content for section 03 based on the selected menu item
  const section03Content = {
    item1: "Content for item 1",
    item2: "Content for item 2",
    item3: "Content for item 3",
  };

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

      <div className="h-screen w-full bg-zinc-100 p-6">
        <div className="grid gap-6 lg:flex">
          <div className="grid w-full grid-cols-1 lg:w-2/5 h-1/5">
            <div className="grid-cols-1 rounded-xl border bg-white p-8 text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-slate-800 p-2">
                  <img className="h-40 w-40 rounded-full" src="https://images.unsplash.com/photo-1694878982063-9c41c1d94f4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" alt="" srcSet="" />
                </div>
              </div>
              <div className="mt-8">
                <span className="text-lg font-bold">Kusuma J</span>
              </div>
            </div>
            <div className="mt-6 rounded-xl border bg-white p-8">
              <div className="hidden lg:block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

                Desktop View
              </div>
              <div className="block lg:hidden">

                <ul>
                  <li
                    className={`cursor-pointer ${selectedMenuItem === 'item1' ? 'text-blue-500 font-bold' : ''}`}
                    onClick={() => handleMenuItemClick('item1')}
                  >
                    Menu Item 1
                  </li>
                  <li
                    className={`cursor-pointer ${selectedMenuItem === 'item2' ? 'text-blue-500 font-bold' : ''}`}
                    onClick={() => handleMenuItemClick('item2')}
                  >
                    Menu Item 2
                  </li>
                  <li
                    className={`cursor-pointer ${selectedMenuItem === 'item3' ? 'text-blue-500 font-bold' : ''}`}
                    onClick={() => handleMenuItemClick('item3')}
                  >
                    Menu Item 3
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full h-screen rounded-xl border bg-white p-6 lg:w-3/5">
            {/* Content for section 03 based on the selected menu item */}
            {section03Content[selectedMenuItem]}
          </div>
        </div>
      </div>


    </>
  );
}

export default UserProfile

