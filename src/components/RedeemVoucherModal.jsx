import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"
import { apiGet } from "@/api/ApiService"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { nbDefaultImage } from "@/assets"

export default function RedeemVoucherModal({
  open,
  setOpen,
  notifyChangeVoucher,
}) {
  const [selected, setSelected] = useState(null)
  const [coupons, setCoupons] = useState([])
  const [code, setCode] = useState("")
  const [privateVoucher, setPrivateVoucher] = useState(null)
  const [publicVoucher, setPublicVoucher] = useState(null)

  // coupon code
  useEffect(() => {
    fetchCoupons()
  }, [])
  const handleSelected = (value) => {
    setSelected(value)
  }

  const fetchCoupons = async () => {
    await apiGet(
      "coupons/?ordering=-created_at",
      (data) => onGetCouponsSuccess(data),
      (err) => onGetCouponsError(err)
    )
  }

  const onGetCouponsSuccess = (response) => {
    console.log("Coupon Response on the Top Coupon", response)
    setCoupons(response.results)
  }

  const onGetCouponsError = (error) => {
    console.log(error)
  }

  const handleNotifyChangeDefaultAddress = () => {
    notifyChangeDefaultAddress()
    setOpen(false)
  }

  const handleCouponChange = async () => {
    console.log("Test Check Coupon")
    if (code.length == 16) {
      await apiGet(
        `coupon-checking/?coupon=${code}`,
        (data) => onSuccessCoupon(data),
        (error) => onErrorCoupon(error)
      )
    }
  }

  const onSuccessCoupon = (data) => {
    setPrivateVoucher(data)
    console.log(data)
  }
  const onErrorCoupon = (error) => {
    console.log(error)
  }
  const handleCancelAction = () => {}

  const handleAddVoucher = () => {
    notifyChangeVoucher("Send Test 1")
    setOpen(false)
  }
  const handlePublicVoucher = (event, item) => {
    setPublicVoucher(event.target.checked ? item : null)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto w-full">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 w-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full md:w-1/2 lg:w-1/3 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start items-center justify-center w-full">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Select Address
                    </Dialog.Title>
                    <div className="mt-2 w-full">
                      <div className="flex flex-col ">
                        <div className="">
                          {/* search section  */}
                          <div className="bg-zinc-300 grid grid-cols-5 py-3 rounded-lg">
                            <div className="flex justify-center">
                              <p>Code</p>
                            </div>
                            <div className="col-span-3">
                              <input
                                id="coupon"
                                name="coupon"
                                type="text"
                                required
                                className="rounded-md h-full w-full  lg:col-span-2 text-sm p-1 border-2  border-zinc-100   bg-white pl-2  transition-all duration-300 focus:ring focus:border-yellow-500 focus:ring-yellow-500/20"
                                placeholder="Coupon code"
                                onChange={(e) => setCode(e.target.value)}
                              />
                            </div>
                            <div className="col-span-1 flex justify-center">
                              <button
                                type="button"
                                onClick={handleCouponChange}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                          {/* end search section */}
                          <div className="">
                            {privateVoucher != null && (
                              <div className="flex gap-x-4 py-5">
                                <img
                                  src=""
                                  className="h-12 w-12 flex-none rounded-lg bg-gray-50"
                                  onError={(e) =>
                                    (e.target.src = nbDefaultImage)
                                  }
                                />
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold leading-6 text-gray-900">
                                    name
                                  </p>
                                  <div className=" flex flex-row ">
                                    <p className="mt-1 truncate text-sm leading-5 text-gray-500 ">
                                      vocuher code
                                    </p>

                                    <input
                                      id="select-all"
                                      aria-describedby="comments-description"
                                      name="comments"
                                      type="checkbox"
                                      //   disabled={
                                      //     publicVoucher != null &&
                                      //     publicVoucher?.id != item?.id
                                      //   }
                                      //   onChange={(e) =>
                                      //     handlePublicVoucher(e, item)
                                      //   }
                                      className="ml-2 mt-2 h-4 w-4 rounded border-gray-300 text-zinc-800 ring-0 ring-zinc-800 "
                                    />
                                  </div>
                                </div>
                              </div>
                              //   <div className="relative flex items-start pb-4 pt-3.5 ">

                              //     <div className="min-w-0 flex-1 text-sm leading-6">
                              //       <label
                              //         htmlFor="comments"
                              //         className="font-medium text-gray-900"
                              //       >
                              //         Comments
                              //       </label>
                              //       <p
                              //         id="comments-description"
                              //         className="text-gray-500 "
                              //       >
                              //         {privateVoucher?.dicount_percentage}
                              //       </p>
                              //     </div>
                              //     <div className="ml-3 flex h-6 items-center">
                              //       <input
                              //         id="comments"
                              //         aria-describedby="comments-description"
                              //         name="comments"
                              //         type="checkbox"
                              //         className="h-4 w-4 rounded border-gray-300"
                              //         onChange={() => setPrivateVoucher(null)}
                              //       />
                              //     </div>
                              //   </div>
                            )}
                          </div>
                        </div>

                        {/* list of the Voucher */}
                        <div className=" py-2">
                          <div className=" ">
                            {coupons.map((item) => (
                              <div key={item.id}>
                                <div
                                  key={item.id}
                                  className="flex gap-x-4 py-5"
                                >
                                  <img
                                    src={item?.cover}
                                    className="h-12 w-12 flex-none rounded-lg bg-gray-50"
                                    onError={(e) =>
                                      (e.target.src = nbDefaultImage)
                                    }
                                  />
                                  <div className="min-w-0">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                      {item?.name}
                                    </p>
                                    <div className=" flex flex-row ">
                                      <p className="mt-1 truncate text-sm leading-5 text-gray-500 ">{`${item?.prefix_code}${item?.private_code}`}</p>

                                      <input
                                        id="select-all"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        disabled={
                                          publicVoucher != null &&
                                          publicVoucher?.id != item?.id
                                        }
                                        onChange={(e) =>
                                          handlePublicVoucher(e, item)
                                        }
                                        className="ml-2 mt-2 h-4 w-4 rounded border-gray-300 text-zinc-800 ring-0 ring-zinc-800 "
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* save page */}
                          <div className="flex justify-start">
                            <button
                              className="mr-4"
                              type="button"
                              onClick={handleCancelAction}
                            >
                              Cancel
                            </button>
                            <button type="button" onClick={handleAddVoucher}>
                              Ok
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
