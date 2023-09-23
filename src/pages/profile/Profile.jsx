import { logout } from '../../tools/auth'
import useAuthStore from "../../store/authStore";
import api from '../../tools/api';
import { useState, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import useDrag from "./_component/useDrag";
import './styles/profile.css'


import { Card } from "./_component/menuItem/card";

const elemPrefix = "test";
const getId = (index) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(5)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));


const Profile = () => {

  const [items] = useState(getItems);

  // NOTE: for drag by mouse
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag = ({ scrollContainer }) => (ev) =>
    dragMove(ev, (posDiff) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft += posDiff;
      }
    });

  const [selected, setSelected] = useState("");
  const handleItemClick = (itemId) => () => {
    if (dragging) {
      return false;
    }
    setSelected(selected !== itemId ? itemId : "");
  };

  const onWheel = (apiObj, ev) => {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }

    if (ev.deltaY < 0) {
      apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev();
    }
  };



  const allUserData = useAuthStore((state) => state.allUserData);
  const [userDetails, setUserDetails] = useState({});

  // fetch user detailsz
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


                <div className="example" >
                  <div onMouseLeave={dragStop}>
                    <ScrollMenu
                      onWheel={onWheel}
                      onMouseDown={() => dragStart}
                      onMouseUp={() => dragStop}
                      onMouseMove={handleDrag}
                      scrollContainerClassName="example"
                    >
                      {items.map(({ id }) => (
                        <Card
                          title={id}
                          itemId={id} // NOTE: itemId is required for tracking items
                          key={id}
                          onClick={handleItemClick(id)}
                          selected={id === selected}
                        />
                      ))}
                    </ScrollMenu>
                  </div>
                </div>

                {/* <ul>
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
                </ul> */}
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

export default Profile

