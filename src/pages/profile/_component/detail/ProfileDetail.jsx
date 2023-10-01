import { logout } from '../../../../tools/auth'
import useAuthStore from "../../../../store/authStore";
import api from '../../../../tools/api';
import { useState, useEffect } from 'react';
import { apiGet } from '../../../../api/ApiService'

import { PaperClipIcon } from '@heroicons/react/24/solid'

const ProfileDetail = () => {
  const allUserData = useAuthStore((state) => state.allUserData);
  const [userDetails, setUserDetails] = useState({});
  const [shippingList, setShippingList] = useState(null);


  // fetch user detailsz
  const fetchUserDetails = async () => {
    const { data, error } = await api.get('/api/account/' + allUserData + '/');
    if (!error) {
      console.log(data);
      setUserDetails(data);
    } else {
      console.log(error);
    }
  };

  const getShippingData = async () => {
    await apiGet('shipping/', (data) => onShippingSucces(data), (error) => onShippingError(error))
  }

  const onShippingSucces = (data) => {

    // filter array and selected only user shipping address
    const filterShipping = data.results.filter((item) => item.is_default === true)
    console.log(filterShipping);
    setShippingList(filterShipping[0] ?? null)
  }

  const onShippingError = (error) => {

  }

  const handleLogout = async () => {
    const { error } = await logout();
    if (!error) {
      window.location.reload();
    }
  };

  useEffect(() => {
    fetchUserDetails();
    getShippingData();
  }, []);

  return (
    <>
      <div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetails.first_name} {userDetails.last_name}</dd>
            </div>
            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetails.email}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">Phone Number</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetails.user_details?.phone_number ?? '-'}</dd>
            </div>
            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">Birth Date</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetails.user_details?.date_of_birth ?? '-'}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userDetails.user_details?.gender ?? '-'}</dd>
            </div>
            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">Kab/Kec</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{shippingList?.destination?.route}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm font-medium leading-6 text-gray-900">Detail</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{shippingList?.receiver_address}</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}

export default ProfileDetail

