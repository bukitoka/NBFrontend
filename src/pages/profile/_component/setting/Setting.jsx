import { useState, useEffect } from 'react';
import {
  ReceiptPercentIcon,
  GlobeAltIcon,
  PencilIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/solid'

const Setting = () => {

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
            <PencilIcon className={` max-h-4`} />
            <div className="min-w-0  flex items-center justify-center">
              <p className=" ms-1 text-center text-sm font-semibold ">Edit Profile</p>
            </div>
          </li>
          <li className="flex gap-x-4 py-5 hover:bg-zinc-100 rounded-lg px-4 hover:text-yellow-500">
            <BuildingOfficeIcon className={` max-h-4`} />
            <div className="min-w-0  flex items-center justify-center">
              <p className=" ms-1 text-center text-sm font-semibold ">address</p>
            </div>
          </li>
        </ul>

      </div>
    </>
  );
}

export default Setting

