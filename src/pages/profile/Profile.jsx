import { logout } from '../../tools/auth'
import useAuthStore from "../../store/authStore";
import api from '../../tools/api';
import { useState, useEffect } from 'react';
import {
  UserCircleIcon, ShoppingBagIcon,
  Cog6ToothIcon,
  HeartIcon,
  ReceiptPercentIcon,
} from '@heroicons/react/24/solid'
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import useDrag from "./_component/useDrag";
import './styles/profile.css'
import ProfileDetail from './_component/detail/ProfileDetail'
import OrderHistory from './_component/orderHistory/OrderHistory'
import Footer from '../../components/Footer'

import { Card } from "./_component/menuItem/card";


// new array with contain id, title,
const menuItems = [
  {
    id: 1,
    title: 'Profile'
  },
  {
    id: 2,
    title: 'Order History'
  },
  {
    id: 3,
    title: 'Wishlist'
  },
  {
    id: 4,
    title: 'Coupons'
  }
  , {
    id: 5,
    title: 'Settings'
  }
]


const Profile = () => {

  const [items] = useState(menuItems);

  // NOTE: for drag by mouse
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag = ({ scrollContainer }) => (ev) =>
    dragMove(ev, (posDiff) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft += posDiff;
      }
    });

  const [selected, setSelected] = useState(1);
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

  return (
    <>
      <div className="h-full w-full bg-zinc-100 p-6">
        <div className="grid gap-6 lg:flex">
          <div className="grid w-full grid-cols-1 lg:w-2/5 h-1/5">
            <div className="grid-cols-1 rounded-xl border bg-white p-8 text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-slate-800 p-2">
                  <img className="h-40 w-40 rounded-full" src="https://images.unsplash.com/photo-1694878982063-9c41c1d94f4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" alt="" srcSet="" />
                </div>
              </div>
              <div className="mt-8">
                <span className="text-lg font-bold">{userDetails.first_name} {userDetails.last_name}</span>
              </div>
            </div>
            <div className="mt-6 rounded-xl border bg-white py-6 px-6">
              <div className="hidden lg:block">
                {
                  items.map((item) => (
                    <>
                      <div
                        key={item.id}
                        onClick={handleItemClick(item.id)}
                        className={`p-2 rounded-lg ${selected === item.id ? 'bg-zinc-100 ' : ''} hover:bg-zinc-100 mb-2`}>
                        {item.id === 1 ? <div className={`flex flex-row ${selected === item.id ? 'text-yellow-500' : 'text-zinc-800'}  hover:text-yellow-500`}>
                          < UserCircleIcon className={` max-h-8`} />
                          <p className='flex items-center justify-center ms-1 text-center'>Profile</p>
                        </div> : <></>}

                        {item.id === 2 ? <div className={`flex flex-row ${selected === item.id ? ' text-yellow-500' : 'text-zinc-800'} hover:text-yellow-500`}>
                          <ShoppingBagIcon className={` max-h-8`} />
                          <p className='flex items-center justify-center ms-1 text-center'>Order History</p>
                        </div> : <></>}

                        {item.id === 3 ?
                          <div className={`flex flex-row ${selected === item.id ? ' text-yellow-500' : 'text-zinc-800'} hover:text-yellow-500`}>
                            <HeartIcon className={` max-h-8`} />
                            <p className='flex items-center justify-center ms-1 text-center'>wishList </p>
                          </div> : <></>}
                        {item.id === 4 ?
                          <div className={`flex flex-row ${selected === item.id ? ' text-yellow-500' : 'text-zinc-800'} hover:text-yellow-500`}>
                            <ReceiptPercentIcon className={` max-h-8`} />
                            <p className='flex items-center justify-center ms-1 text-center'>Voucher </p>
                          </div>
                          : <></>}
                        {item.id === 5 ?
                          <div className={`flex flex-row ${selected === item.id ? ' text-yellow-500' : 'text-zinc-800'} hover:text-yellow-500`}>
                            <Cog6ToothIcon className={` max-h-8`} />
                            <p className='flex items-center justify-center ms-1 text-center'>Settings</p>
                          </div> : <></>}
                      </div>
                    </>
                  ))
                }

              </div >
              <div className="block lg:hidden">


                <div className="example" >
                  <div onMouseLeave={dragStop}>
                    <ScrollMenu
                      onWheel={onWheel}
                      onMouseDown={() => dragStart}
                      onMouseUp={() => dragStop}
                      onMouseMove={handleDrag}
                      scrollContainerClassName="example rounded-md gap-2"
                    >
                      {items.map(({ id, title }) => (
                        <Card
                          title={title}
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
          <div className="w-full h-full rounded-xl border bg-white p-6 lg:w-3/5">
            {/* Content for section 03 based on the selected menu item */}

            {
              selected === 1 ? <ProfileDetail /> : <></>
            }

            {
              selected === 2 ? <OrderHistory /> : <></>
            }

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile

