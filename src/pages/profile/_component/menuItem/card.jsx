import React, { useContext } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import {
  UserCircleIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  HeartIcon,
  ReceiptPercentIcon,
} from '@heroicons/react/24/solid'

export function Card({
  itemId,
  selected,
  onClick,
  title
}) {
  const visibility = useContext(VisibilityContext);

  const visible = visibility.isItemVisible(itemId);

  return (

    <div
      onClick={onClick}
      className=" bg-zinc-200 rounded-md h-10 w-36 flex justify-items-center">
      <div className="flex flex-row">
        {
          (itemId == 1) ? <UserCircleIcon className={` ${selected ? 'text-yellow-500' : 'text-zinc-800'} max-h-8 ml-1 mt-1`} /> : <></>
        }
        {
          (itemId == 2) ? <ShoppingBagIcon className={`${selected ? 'text-yellow-500' : 'text-zinc-800'}  max-h-8 ml-1 mt-1`} /> : <></>
        }
        {
          (itemId == 3) ? <HeartIcon className={`${selected ? 'text-yellow-500' : 'text-zinc-800 '} max-h-8 ml-1 mt-1`} /> : <></>
        }
        {
          (itemId == 4) ? <ReceiptPercentIcon className={`${selected ? 'text-yellow-500' : 'text-zinc-800'} max-h-8 ml-1 mt-1`} /> : <></>
        }
        {
          (itemId == 5) ? <Cog6ToothIcon className={`${selected ? 'text-yellow-500' : 'text-zinc-800'} max-h-8 ml-1 mt-1`} /> : <></>
        }

        <p className={`flex items-center justify-center ms-1 text-cente ${selected ? 'text-yellow-500' : 'text-zinc-800'}`}>{title} </p>
      </div>
    </div>
  );
}
