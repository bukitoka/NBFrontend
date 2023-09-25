import React, { useContext } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import {
  UserCircleIcon,
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

    <div className="mx-1 bg-zinc-200 rounded-md h-20 w-40">
      <div className="flex flex-row">
        <UserCircleIcon className="text-lg" />
        <a href="#" className="flex items-center justify-center  ms-1 text-center bg-green-200">UserDetail</a>
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
