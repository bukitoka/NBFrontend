import { Fragment, useState, useCallback, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import AsyncSelect from 'react-select/async';
import { apiGet } from '../../../api/ApiService'
import { useDebounce } from 'use-debounce';

export default function Example({ open, setOpen }) {
  const [inputValue, setValue] = useState('');
  const [shippingList, setShippingList] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  // handle input change event
  const handleInputChange = value => {
    setValue(value);
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
    console.log(data.results);
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

    return formattedOptions;
  };

  // wrap the loadOptions function with useDebounce
  const [debouncedLoadOptions] = useDebounce(loadOptions, 500);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {/* <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-6 pb-6 pt-7 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-8"> */}
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
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
                            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                              <div className="sm:col-span-2">
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                  Add new Address
                                </label>
                                <div className="mt-1">

                                  <AsyncSelect
                                    cacheOptions
                                    defaultOptions
                                    value={selectedValue}
                                    getOptionLabel={e => e.label}
                                    getOptionValue={e => e.value}
                                    loadOptions={debouncedLoadOptions}
                                    onInputChange={handleInputChange}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                  Address
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    autoComplete="street-address"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                              </div>
                              <div className="sm:col-span-2">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                  Phone
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    autoComplete="tel"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
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


