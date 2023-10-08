import { logout } from '../../../../tools/auth'
import useAuthStore from "../../../../store/authStore";
import api from '../../../../tools/api';
import { useState, useEffect } from 'react';
import { apiGet, apiPatchRoute } from '../../../../api/ApiService'
import { ToastContainer, toast } from 'react-toastify';
import {
  PencilSquareIcon,
  XMarkIcon
} from '@heroicons/react/24/solid'
import dayjs from 'dayjs';
// import DatePicker from "react-datepicker";
// import DatePicker from 'react-date-picker';
import Datepicker from "react-tailwindcss-datepicker";
import './ProfileDetail.css'

const ProfileDetail = () => {
  const allUserData = useAuthStore((state) => state.allUserData);
  const [temporaryUser, setTemporaryUser] = useState({});
  const [shippingList, setShippingList] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [gender, setGender] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const [datePickerValue, setDatePickerValue] = useState({
    startDate: "2023-01-01",
    endDate: "2023-01-01",
  });


  // fetch user detailsz
  const fetchUserDetails = async () => {
    const { data, error } = await api.get('/api/account/' + allUserData + '/');
    if (!error) {
      if (data != null) {
        setUserData(data);
      }
      setTemporaryUser(data);
    } else {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    await apiPatchRoute(`/auth/user/`, {
      first_name: firstName,
      last_name: lastName,
      user_details: {
        phone_number: phoneNumber,
        gender: gender,
        date_of_birth: dateOfBirth
      }
    }, (data) => onProfileUpdateSuccess(data), (error) => onProfileUpdateError(error))
  }

  const handleGenderChange = (e) => { setGender(e.target.value) }

  const onProfileUpdateSuccess = (data) => {
    setUserData(data);
    setTemporaryUser(data);
    setIsEdit(false);
    toast.success("Your Profile Has been updated.");
  }

  const onProfileUpdateError = (error) => {
    console.log(error);
  }

  const setUserData = (userData) => {
    setFirstName(userData.first_name);
    setLastName(userData.last_name);
    setEmail(userData.email);
    setPhoneNumber(userData.user_details.phone_number);
    setDateOfBirth(userData.user_details.date_of_birth);
    setGender(userData.user_details.gender)
    setDatePickerValue({
      startDate: userData.user_details.date_of_birth,
      endDate: userData.user_details.date_of_birth,
    })
  }

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

  const changeMode = () => {
    if (isEdit) {
      setUserData(temporaryUser);
    }

    // change mode
    setIsEdit(!isEdit)
  }

  const handleValueChange = (selectedDate) => {
    setDateOfBirth(selectedDate.startDate)
    setDatePickerValue(selectedDate)
  }

  const handleUpdateAdress = () => {
    console.log('update address')
  }

  useEffect(() => {
    fetchUserDetails();
    getShippingData();
  }, []);

  return (
    <form>
      <ToastContainer
        toastClassName="rounded-lg"
        bodyClassName="text-sm font-semibold"
        position="top-center"
      />
      <div className='flex flex-col'>
        <div className='flex justify-end pb-4'>
          {isEdit ? <XMarkIcon className='h-6 w-6 text-zinc-800 hover:text-yellow-500' onClick={changeMode} /> :
            <PencilSquareIcon className='h-6 w-6 text-zinc-800 hover:text-yellow-500' onClick={changeMode} />
          }
        </div>
        {/* first name */}
        <div className="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-4 bg-gray-50 px-4 py-4 rounded-lg gap-1 lg:gap-6">
          <dt className=" text-sm font-medium leading-6 text-gray-900 ">First Name</dt>
          {
            isEdit ? <>
              <input
                id="first-name"
                name="first-name"
                type="text"
                required
                className="lg:col-span-2 text-sm p-1 border-2 border-zinc-100 rounded-md  bg-white pl-2  transition-all duration-300 focus:ring focus:border-yellow-500 focus:ring-yellow-500/20"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </> :
              <dd className="mt-0 pl-1 text-sm text-gray-700 lg:col-span-2 ">{firstName}</dd>
          }
        </div>

        {/* last name */}
        <div className="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-4 px-4 py-4 rounded-lg gap-1 lg:gap-6">
          <dt className="text-sm font-medium leading-6 text-gray-900 ">Last Name</dt>
          {
            isEdit ? <>
              <input
                id="last-name"
                name="last-name"
                type="text"
                required
                className="lg:col-span-2 text-sm p-1 border-2 border-zinc-100 rounded-md  bg-white pl-2  transition-all duration-300 focus:ring focus:border-yellow-500 focus:ring-yellow-500/20"
                placeholder="last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </> :
              <dd className=" lg:col-span-2 mt-1 pl-1 text-sm text-gray-700 ">{lastName}</dd>
          }
        </div>

        {/* email */}
        <div className="grid grid-rows-2 lg:grid-rows-none bg-gray-50 lg:grid-cols-4 px-4 py-4 rounded-lg gap-1 lg:gap-6">
          <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
          <dd className="lg:col-span-2 mt-1 pl-1 text-sm text-gray-700">{email}</dd>
        </div>

        {/* phone number */}
        <div className="grid grid-rows-2 lg:grid-rows-none  lg:grid-cols-4 px-4 py-4 rounded-lg gap-1 lg:gap-6">
          <dt className="text-sm font-medium leading-6 text-gray-900">Phone Number</dt>
          {
            isEdit ? <>
              <input
                id="last-name"
                name="last-name"
                type="text"
                required
                className="lg:col-span-2 text-sm p-1 border-2 border-zinc-100 rounded-md  bg-white pl-2  transition-all duration-300 focus:ring focus:border-yellow-500 focus:ring-yellow-500/20"
                placeholder="last name"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </> :
              <dd className="mt-0 pl-2 text-sm text-gray-700 sm:col-span-2">{phoneNumber}</dd>
          }
        </div>
        {/* birth day */}
        <div className="grid grid-rows-2 lg:grid-rows-none  bg-gray-50 lg:grid-cols-4 px-4 py-4 rounded-lg gap-1 lg:gap-6">
          <dt className="text-sm font-medium leading-6 text-gray-900">Birth Date</dt>
          {
            isEdit ? <>
              <Datepicker
                value={datePickerValue}
                onChange={handleValueChange}
                asSingle={true}
                useRange={false}
                primaryColor={"yellow"}
                popoverDirection='down'
                displayFormat='MMMM D, YYYY'
                containerClassName={`relative lg:col-span-2`}
                inputClassName={`w-full relative transition-all duration-300 py-2 pl-4 pr-0 w-full border-gray-100 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-yellow-500 focus:ring-yellow-500/20`}
              />
            </> :
              <dd className="mt-0 pl-2 text-sm text-gray-700 lg:col-span-2">{dayjs(dateOfBirth).format('MMMM D, YYYY') ?? '-'}</dd>
          }
        </div>
        {/* Gender */}
        <div className="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-4 px-4 py-4 rounded-lg gap-1 lg:gap-6">
          <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
          {
            isEdit ? <>
              <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                <div key="male" className="flex items-center">
                  <input
                    id="male"
                    name="notification-method"
                    type="radio"
                    value="male"
                    onChange={(e) => handleGenderChange(e)}
                    defaultChecked={gender == 'male'}
                    className="h-3 w-3 border-gray-300 text-yellow-500 focus:ring-yellow-500"
                  />
                  <label htmlFor="male" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                    Male
                  </label>
                </div>
                <div key="female" className="flex items-center">
                  <input
                    id="female"
                    name="notification-method"
                    type="radio"
                    value="female"
                    defaultChecked={gender == 'female'}
                    onChange={(e) => handleGenderChange(e)}
                    className="h-3 w-3 border-gray-300 text-yellow-500 focus:ring-yellow-500"
                  />
                  <label htmlFor="female" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                    Female
                  </label>
                </div>
              </div>
            </> :
              <dd className="mt-0 pl-2 text-sm text-gray-700 lg:col-span-2 ">{gender ?? '-'}</dd>
          }
        </div>

        {/* adress */}
        <div className=" bg-gray-50 flex flex-col lg:grid lg:grid-rows-none lg:grid-cols-4 px-4 py-4 rounded-lg gap-1 lg:gap-6 ">

          <dt className="text-sm font-medium leading-6 text-gray-900 mb-0">Address</dt>
          <div className={`pl-2 lg:col-span-2 ${isEdit ? 'border-2 border-gray-50 bg-white p-1 rounded-lg transition-all duration-300 hover:ring hover:border-yellow-500 hover:ring-yellow-500/20' : ''}`}
            onClick={() => isEdit ? handleUpdateAdress() : null}
          >
            <dd className="text-sm leading-6 text-gray-700 ">{shippingList?.destination?.route}</dd>
            <dd className="text-sm leading-6 text-gray-700">{shippingList?.receiver_address}</dd>
          </div>
        </div>

        {
          isEdit ? <div className='flex items-center justify-center mt-3'>
            <button
              type="button"
              onClick={() => updateProfile()}
              className="mt-4 bg-yellow-600 border border-transparent rounded-lg py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
              Update
            </button>
          </div> : <></>
        }


      </div>
    </form>
  );
}

export default ProfileDetail

