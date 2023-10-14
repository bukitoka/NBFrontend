import { Fragment, useState, useCallback, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import AsyncSelect from 'react-select/async';
import { apiGet, apiPost } from '../../../api/ApiService'
import { useDebounce } from 'use-debounce';

export default function Example({ open, setOpen }) {
  const [inputValue, setValue] = useState('');
  const [shippingList, setShippingList] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [dialogHeight, setDialogHeight] = useState('500px');
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [reciever, setReciever] = useState('')
  const [options, setOptions] = useState([])


  // handle input change event
  const handleInputChange = (value) => {
    setValue(value);
    const optionstest = document.querySelectorAll(".select__option");
    console.log("options length in change " + optionstest.length)
  };

  // handle selection
  const handleChange = value => {
    setSelectedValue(value);
  }

  // fetch shipping data using API call
  const getShippingData = async (search, onSuccess, onError) => {
    await apiGet(`shipping-route/?search=${search}`, onSuccess, onError);
  };
  // success callback
  const onSuccess = data => {
    setShippingList(data.results);
  };

  // error callback
  const onError = error => {
    console.log(error);
  };

  // load options using API call
  const loadOptions = async (inputValue) => {

    // Call the API and set the options
    await getShippingData(inputValue, onSuccess, onError);

    // Process the fetched data to be used as select options
    const formattedOptions = shippingList.map((item) => ({
      value: item.id,
      label: item.route,
    }));

    setOptions(formattedOptions);

    // console.log("formatted options length" + formattedOptions.length);
    // console.log(formattedOptions);

    return formattedOptions;
  };

  // save data
  const saveData = () => {
    const data = {
      receiver_name: reciever,
      receiver_phone: phone,
      receiver_address: address,
      destination: selectedValue.value
    }

    apiPost(`shipping/`, data, (res) => onSuccessSaving(res), (res) => onErrorSaving(res))
  }

  function onSuccessSaving(data) {
    setOpen(false)
    resetForm()
  }

  function onErrorSaving(error) {
    setOpen(false)
    console.log("error saving");
    resetForm()
  }

  const resetForm = () => {
    setSelectedValue(null);
    setAddress('');
    setPhone('');
  };



  // wrap the loadOptions function with useDebounce
  const [debouncedLoadOptions] = useDebounce(loadOptions, 500);

  useEffect(() => {
    // Calculate the desired height based on the number of options in AsyncSelect
    const numOptions = shippingList ? shippingList.length : 0;
    // console.log("number options" + numOptions);

    // const optionsLength = options ? options.length : 0;
    // console.log(`options lenght` + optionsLength)

    // const calculatedHeight = `${Math.min(500, 500 + numOptions * 50)}px`; // Adjust as needed
    // const calculatedHeight = `${Math.min(500 + optionsLength * 50)}px`; // Adjust as needed
    // const calculatedHeight = `${Math.min(470, 470)}px`; // Adjust as needed

    // Set the dialog height
    // setDialogHeight(calculatedHeight);

    // console.log("dialog height" + dialogHeight);
    // checkLength()
    // loadOptions()
  }, [options]);

  function checkLength() {
    const optionsLength = options ? options.length : 0;
    const optionstest = document.querySelectorAll(".select__option");
    console.log("options length gasa" + optionstest.length)
    // setOptionsCount(options.length);
    // console.log(`options lenght` + optionsLength)
    // console.log("on Open data");
    // console.log("isi data ")
    // console.log(shippingList);
    // console.log("length" + shippingList.length);

    // console.log(`options lenght` + optionsLength)

    // const calculatedHeight = `${Math.min(500, 500 + numOptions * 50)}px`; // Adjust as needed
    // const calculatedHeight = `${Math.min(500 + optionsLength * 50)}px`; // Adjust as needed
    // const calculatedHeight = `${Math.min(470, 470)}px`; // Adjust as needed

    // Set the dialog height
    // setDialogHeight();
    // setDialogHeight('auto');
    setDialogHeight('530px');
  }

  function closeMenu() {
    console.log("close menu");
    setDialogHeight('500px');
  }

  const customstyles = {

    menuportal: provided => ({ ...provided, zindex: 9999 }),
    menu: provided => ({ ...provided, zindex: 9999 })

  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="z-50" onClose={setOpen}>
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

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className=" transform overflow-hidden rounded-lg bg-white px-4  pt-5 text-left shadow-xl transition-all sm:my-8 w-full lg:w-1/3 md:w-1/2 sm:p-6 pb-80"
              // style={{ height: dialogHeight }}
              >
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start items-center justify-center">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Add new Address
                    </Dialog.Title>
                    <div className="mt-2">
                      <form className="lg:grid lg:grid-cols-1 lg:gap-x-12 xl:gap-x-16 ">
                        <div>
                          <div className="mt-2">
                            <div className="sm:col-span-2">
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-start">
                                Reciever
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="reciever"
                                  id="reciever"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={reciever}
                                  onChange={(e) => setReciever(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-2">
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-start">
                                Phone
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="phone"
                                  id="phone"
                                  autoComplete="tel"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                              <div className="sm:col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 text-start">
                                  more details
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    autoComplete="street-address"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-2 ">
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 text-start">
                                  Kecamatan/Kabupaten
                                </label>
                                <div className="mt-1 ">

                                  <AsyncSelect
                                    cacheOptions
                                    defaultOptions
                                    value={selectedValue}
                                    getOptionLabel={e => e.label}
                                    getOptionValue={e => e.value}
                                    loadOptions={loadOptions}
                                    onInputChange={handleInputChange}
                                    onChange={handleChange}
                                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                                    menuPortalTarget={document.body}
                                    menuPlacement="auto"
                                  />
                                </div>
                              </div>
                              <div className="sm:col-span-2">
                                <button
                                  type="button"
                                  className="bg-zinc-800 hover:bg-yellow-500 text-white font-bold py-2 px-4 mb-4 rounded-lg w-full"
                                  onClick={() => saveData()}
                                >
                                  Save
                                </button>
                              </div>

                            </div>
                          </div>
                        </div>
                      </form>

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


