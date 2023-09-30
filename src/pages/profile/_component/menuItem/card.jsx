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
      className="mx-1 bg-zinc-200 rounded-md h-16 w-36 flex justify-items-center">
      <div className="flex flex-row">
        {
          (itemId == 1) ? <UserCircleIcon className=" text-zinc-800 hover:text-yellow-500 max-h-16" /> : <></>
        }
        {
          (itemId == 2) ? <ShoppingBagIcon className=" text-zinc-800 hover:text-yellow-500 max-h-16" /> : <></>
        }
        {
          (itemId == 3) ? <Cog6ToothIcon className=" text-zinc-800 hover:text-yellow-500 max-h-16" /> : <></>
        }
        {
          (itemId == 4) ? <HeartIcon className=" text-zinc-800 hover:text-yellow-500 max-h-16" /> : <></>
        }
        {
          (itemId == 5) ? <ReceiptPercentIcon className=" text-zinc-800 hover:text-yellow-500 max-h-16" /> : <></>
        }

        <a href="#" className="flex items-center justify-center ms-1 text-cente hover:text-yellow-500">{title} {selected ? "selected" : "not Selected"}</a>

      </div>
    </div>



    // <div
    //   onClick={onClick}
    //   role="button"
    //   style={{
    //     border: "1px solid",
    //     display: "inline-block",
    //     margin: "0 10px",
    //     width: "160px",
    //     userSelect: "none"
    //   }}
    //   tabIndex={0}
    //   className="card"
    // >
    //   <UserCircleIcon className="h-6 w-6 bg-slate-100" aria-hidden="true" />
    //   <a href="#" >user Detail</a>

    //   <div>
    //     <div>{title}</div>
    //     <div style={{ backgroundColor: visible ? "transparent" : "gray" }}>
    //       visible: {JSON.stringify(visible)}
    //     </div>
    //     <div>selected: {JSON.stringify(!!selected)}</div>
    //   </div>
    //   <div
    //     style={{
    //       backgroundColor: selected ? "green" : "bisque",
    //       height: "20px"
    //     }}
    //   />

    // </div>
  );
}
