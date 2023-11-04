import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { priceFormatter } from "@/tools/reformat"
import dayjs from 'dayjs';
// import copy from 'copy-text-to-clipboard';
const baseurl = import.meta.env.VITE_API_BASE_URL;

// icons
import { ShoppingBagIcon, CircleStackIcon } from '@heroicons/react/20/solid'

// components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { nbDefaultImage } from "@/assets/";

// api service
import { apiGet } from "@/api/ApiService";


const OrderHistoryDetail = () => {
  // get order id from url params
  const { id } = useParams();

  const { t, i18n } = useTranslation();

  const [order, setOrders] = useState(null);



  useEffect(() => {
    getOrderDetail()
  }, []);

  const getOrderDetail = async () => {
    await apiGet(`order/${id}/`, (data) => onSuccessGetOrderDetail(data), (err) => onErrorGetOrderDetail(err))
  }

  const onSuccessGetOrderDetail = (data) => {
    console.log("order data", data)
    setOrders(data)
  }

  const onErrorGetOrderDetail = (err) => {
    console.log(err)
  }


  return (
    <div className="bg-white">
      {/* Navbar */}
      <Navbar
      />
      <main>
        <div className="bg-white pt-[156px] lg:pt-[156px] pb-8">
          <div className="py-1">
            <div className="mt-2 ">
              <h2 className="sr-only">Recent orders</h2>
              <div className="mx-auto max-w-7xl sm:px-2 lg:px-8 ">
                <div className=" space-y-2 sm:px-4 lg:px-0 ">
                  <div className="border rounded-lg flex flex-col bg-white px-5 py-4">
                    <p className=" text-sm font-bold">Detail Transaction</p>
                    {/* status transactions */}
                    <div className=" mt-2 pt-2 pb-4 border-t-2 border-zinc-300 flex flex-col">
                      <p className="text-sm font-medium">Order Status : {order?.status ?? ""}</p>
                      <p className="text-sm font-medium mt-1">Payment Status : {order?.payment_status}</p>

                      {/* <p className=" text-sm font-medium mt-2">No Invoice: {order?.id }</p> */}
                      <p className=" text-sm font-medium mt-1">Tanggal Transaksi: {dayjs(order?.created_at).format('MMMM D, YYYY h:mm A')}</p>
                    </div>


                  </div>

                  {order && (
                    <div
                      key={order.id}
                      className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                      <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:p-4">
                        <div className='flex flex-row '>
                          <p className=" font-bold">Product Detail</p>
                        </div>
                      </div>

                      {/* Products */}
                      <h4 className="sr-only">Items</h4>
                      <ul role="list" className="divide-y divide-gray-200">
                        {
                          order.order_items.map((item) =>
                            <li key={item.id} className="p-4 sm:p-6">
                              <div className="flex items-center sm:items-start">
                                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                                  <img
                                    src={`${baseurl}/media/${item.stock_image}`}
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                    onError={(e) => { e.target.onerror = null; e.target.src = nbDefaultImage }}
                                  />
                                </div>
                                <div className="ml-6 flex-1 text-sm">
                                  <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                    <h5>{item.product_name}</h5>

                                    <p className='mt-2 sm:mt-0'>Total Amount | Rp. {priceFormatter(item.total_price)}</p>
                                  </div>
                                  <p className="hidden text-gray-500 sm:mt-2 sm:block">total items : {item.quantity} pcs </p>
                                  <p className="hidden text-gray-500 sm:mt-2 sm:block">price/item : Rp. {priceFormatter(item.stock_price)}</p>
                                  <p className="hidden text-gray-500 sm:mt-2 sm:block">size : {item.stock_size}</p>
                                </div>
                              </div>
                            </li>
                          )
                        }
                      </ul>
                    </div>
                  )}

                  {
                    order?.order_shipping?.shipping_ref_code && (
                      <div
                        className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                        <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:p-4">
                          <div className='flex flex-row '>
                            <p className=" font-bold">Shipping Detail</p>
                          </div>
                        </div>

                        {/* Shipping */}
                        <h4 className="sr-only">Items</h4>
                        <div>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 px-4 sm:px-4 sm:py-1">
                            <p className="text-sm font-medium">Resi</p>
                            <div className="flex ">
                              <p className="text-sm font-medium">{order?.order_shipping?.shipping_ref_code}</p>

                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 px-4 sm:px-4 sm:py-1">
                            <p className="text-sm font-medium">Type</p>
                            <p className="text-sm font-medium">{order?.order_shipping?.shipping_type_name}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 px-4 sm:px-4 sm:py-1">
                            <p className="text-sm font-medium">Alamat</p>
                            <p className="text-sm font-medium">{order?.order_shipping?.receiver_address}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 px-4 sm:px-4 sm:py-1">
                            <p className="text-sm font-medium">Estimasi</p>
                            <p className="text-sm font-medium">{order?.order_shipping?.shipping_estimation}</p>
                          </div>
                        </div>
                      </div>
                    )
                  }


                  <div
                    className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                    <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:p-4">
                      <div className='flex flex-row '>
                        <p className=" font-bold">Rincian Pembarayan</p>
                      </div>
                    </div>

                    {/* Products */}
                    <h4 className="sr-only">Items</h4>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-6">
                        <p className="text-sm font-medium">Subtotal ({order?.order_items?.length}) items</p>
                        <p className="text-sm font-medium">Rp. {priceFormatter(order?.subtotal_amount)}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-6">
                        <p className="text-sm font-medium">Shipping</p>
                        <p className="text-sm font-medium">Rp. {priceFormatter(order?.shipping_amount)}</p>
                      </div>
                      {
                        order?.discount_amount > 0 && (
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-6">
                            <p className="text-sm font-medium">Discount</p>
                            <p className="text-sm font-medium"> - Rp. {priceFormatter(order?.discount_amount)}</p>
                          </div>
                        )
                      }

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-6">
                        <p className="text-sm font-medium">Total</p>
                        <p className="text-sm font-medium">Rp. {priceFormatter(order?.total_amount)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OrderHistoryDetail;
