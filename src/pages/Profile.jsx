import { useState, useEffect, useRef } from "react"
import { ToastContainer, toast } from "react-toastify"
import {
  UserCircleIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  HeartIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/solid"

import { PiPencilSimple } from "react-icons/pi"
import { ScrollMenu } from "react-horizontal-scrolling-menu"
import "react-horizontal-scrolling-menu/dist/styles.css"
import useDrag from "@/tools/useDrag"
import ProfileDetail from "@/components/profile/ProfileDetail"
import OrderHistory from "@/components/profile/OrderHistory"
import WishList from "@/components/profile/WishList"
import Footer from "@/components/Footer"
import Coupon from "@/components/profile/Coupon"
import Setting from "@/components/profile/Setting"

import { Card } from "@/components/profile/card"

import { apiPatchMultipart, apiGetRoute } from "@/api/ApiService"

import Navbar from "@/components/Navbar"
import { useTranslation } from "react-i18next"
import { nbDefaultImage } from "@/assets"

// new array with contain id, title,
const menuItems = [
  {
    id: 1,
    title: "Profile",
  },
  {
    id: 2,
    title: "Order History",
  },
  {
    id: 3,
    title: "Wishlist",
  },
  {
    id: 4,
    title: "Coupons",
  },
  {
    id: 5,
    title: "Settings",
  },
]

const Profile = () => {
  const { t } = useTranslation()
  const fileInputRef = useRef(null)

  const [open, setOpen] = useState(false)

  const [items] = useState(menuItems)

  // NOTE: for drag by mouse
  const { dragStart, dragStop, dragMove, dragging } = useDrag()
  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff
        }
      })

  const [selected, setSelected] = useState(1)
  const handleItemClick = (itemId) => () => {
    if (dragging) {
      return false
    }
    setSelected(selected !== itemId ? itemId : "")
  }

  const onWheel = (apiObj, ev) => {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15

    if (isThouchpad) {
      ev.stopPropagation()
      return
    }

    if (ev.deltaY < 0) {
      apiObj.scrollNext()
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev()
    }
  }

  const [userDetails, setUserDetails] = useState({})

  const getUserData = async () => {
    await apiGetRoute(
      "/auth/user/",
      (data) => onGetUserDataSuccess(data),
      (error) => onGetUserDataError(error)
    )
  }

  const onGetUserDataSuccess = (data) => {
    setUserDetails(data)
  }

  const onGetUserDataError = (error) => {
    console.log(error)
  }

  // update image profile
  const updateImageProfile = async (avatarData) => {
    const formData = new FormData()
    formData.append("avatar", avatarData, avatarData.name)

    await apiPatchMultipart(
      "/auth/user/",
      formData,
      (data) => onUpdateImageProfileSuccess(data),
      (error) => onUpdateImageProfileError(error)
    )
  }

  const onUpdateImageProfileSuccess = (data) => {
    getUserData()
    toast.success("Your profile image has been updated")
  }

  const onUpdateImageProfileError = (error) => {
    console.log(error)
  }

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0]
    await updateImageProfile(file)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      <ToastContainer
        toastClassName="rounded-lg"
        bodyClassName="text-sm font-semibold"
        position="top-center"
      />

      {/* Navbar */}
      <Navbar />
      <div className="pt-[150px] lg:pt-[136px]">
        <div className=" w-full   bg-zinc-100 p-6">
          <div className="grid gap-6 lg:flex">
            <div className="grid w-full grid-cols-1 lg:w-2/5 h-1/5">
              <div className="grid-cols-1 rounded-xl border bg-white p-8 text-center">
                <div className="flex justify-center">
                  <div className="rounded-full  transition-all  duration-300 p-2 ring-2 ring-yellow-500 ring-yellow-500/20 border-yellow-500 relative">
                    <button
                      className="absolute bottom-0 right-0 rounded-full bg-white p-2 ring-1 ring-yellow-500 mb-2 mr-2"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <PiPencilSimple className="h-4 w-4 text-zinc-800 hover:text-yellow-500" />
                    </button>
                    <input
                      name="avatar"
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                    <img
                      className="h-40 w-40 rounded-full"
                      src={userDetails.avatar}
                      alt=""
                      srcSet=""
                      onError={(e) => (e.target.src = nbDefaultImage)}
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <span className="text-lg font-bold">
                    {userDetails.first_name} {userDetails.last_name}
                  </span>
                </div>
              </div>
              <div className="mt-6 rounded-xl border bg-white py-6 px-6">
                <div className="hidden lg:block">
                  {items.map((item) => (
                    <div key={item.id}>
                      <div
                        onClick={handleItemClick(item.id)}
                        className={`p-2 rounded-lg ${
                          selected === item.id ? "bg-zinc-100 " : ""
                        } hover:bg-zinc-100 mb-2`}
                      >
                        {item.id === 1 ? (
                          <div
                            className={`flex flex-row ${
                              selected === item.id
                                ? "text-yellow-500"
                                : "text-zinc-800"
                            }  hover:text-yellow-500`}
                          >
                            <UserCircleIcon className={` max-h-8`} />
                            <p className="flex items-center justify-center ms-1 text-center">
                              {t("profilePage_Profile")}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}

                        {item.id === 2 ? (
                          <div
                            className={`flex flex-row ${
                              selected === item.id
                                ? " text-yellow-500"
                                : "text-zinc-800"
                            } hover:text-yellow-500`}
                          >
                            <ShoppingBagIcon className={` max-h-8`} />
                            <p className="flex items-center justify-center ms-1 text-center">
                              {t("profilePage_Orders")}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}

                        {item.id === 3 ? (
                          <div
                            className={`flex flex-row ${
                              selected === item.id
                                ? " text-yellow-500"
                                : "text-zinc-800"
                            } hover:text-yellow-500`}
                          >
                            <HeartIcon className={` max-h-8`} />
                            <p className="flex items-center justify-center ms-1 text-center">
                              {t("profilePage_Wishlist")}{" "}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}
                        {item.id === 4 ? (
                          <div
                            className={`flex flex-row ${
                              selected === item.id
                                ? " text-yellow-500"
                                : "text-zinc-800"
                            } hover:text-yellow-500`}
                          >
                            <ReceiptPercentIcon className={` max-h-8`} />
                            <p className="flex items-center justify-center ms-1 text-center">
                              {t("profilePage_Voucher")}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}
                        {item.id === 5 ? (
                          <div
                            className={`flex flex-row ${
                              selected === item.id
                                ? " text-yellow-500"
                                : "text-zinc-800"
                            } hover:text-yellow-500`}
                          >
                            <Cog6ToothIcon className={` max-h-8`} />
                            <p className="flex items-center justify-center ms-1 text-center">
                              {t("profilePage_Settings")}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="block lg:hidden">
                  <div>
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
                </div>
              </div>
            </div>
            <div className="w-full h-full rounded-xl border bg-white p-6 lg:w-3/5">
              {/* Content for section 03 based on the selected menu item */}

              {selected === 1 ? <ProfileDetail /> : <></>}

              {selected === 2 ? <OrderHistory /> : <></>}

              {selected === 3 ? <WishList /> : <></>}

              {selected === 4 ? <Coupon /> : <></>}

              {selected === 5 ? <Setting /> : <></>}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Profile
