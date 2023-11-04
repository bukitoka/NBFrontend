import { useState, useEffect } from 'react';
import {
  GlobeAltIcon,
} from '@heroicons/react/24/solid'

import { TbSettingsDollar, TbLogout } from 'react-icons/tb'
import { PiPasswordFill } from 'react-icons/pi'
import { logout } from '@/tools/auth'

const Setting = () => {

  const handleLogout = async () => {
    const { error } = await logout();
    if (!error) {
      window.location.reload();
    }
  };

  useEffect(() => {
  }, []);

  return (
    <>
      <div className="bg-white">
        <ul role="list" className="">
          <li className="flex gap-x-4 py-5 hover:bg-zinc-100 rounded-lg px-4 hover:text-yellow-500">
            <GlobeAltIcon className={` max-h-4`} />
            <div className="min-w-0  flex items-center justify-center">
              <p className=" ms-1 text-center text-sm font-semibold ">Language</p>
            </div>
          </li>
          <li className="flex gap-x-4 py-5 hover:bg-zinc-100 rounded-lg px-4 hover:text-yellow-500">
            <PiPasswordFill className={` max-h-4`} />
            <div className="min-w-0  flex items-center justify-center">
              <a href="/change-password" className=' ms-1 text-center text-sm font-semibold'> Change Password</a>
              {/* <p className=" ms-1 text-center text-sm font-semibold "></p> */}
            </div>
          </li>
          {/* <li className="flex gap-x-4 py-5 hover:bg-zinc-100 rounded-lg px-4 hover:text-yellow-500">
            <TbSettingsDollar className={` max-h-4`} />
            <div className="min-w-0  flex items-center justify-center">
              <p className=" ms-1 text-center text-sm font-semibold ">Currency</p>
            </div>
          </li> */}
          <li className="flex gap-x-4 py-5 hover:bg-zinc-100 rounded-lg px-4 hover:text-yellow-500" onClick={handleLogout} >
            <TbLogout className={` max-h-4`} />
            <div className="min-w-0  flex items-center justify-center">
              <p className=" ms-1 text-center text-sm font-semibold ">Logout</p>
            </div>
          </li>

        </ul>

      </div>
    </>
  );
}

export default Setting

