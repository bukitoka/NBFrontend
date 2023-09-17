import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { apiGet } from '../api/ApiService'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({ selected, setSelected }) {
  const [shippingList, setShippingList] = useState([]);

  const getShippingData = async (onSucces, onError) => {
    await apiGet('shipping/', onSucces, onError);
  }

  const onSuccess = data => {
    setShippingList(data.results);
  }

  const onError = error => {
    console.log(error);
  }

  useEffect(() => {
    getShippingData(onSuccess, onError)
  }, [])

  useEffect(() => {
    console.log(selected);
  }, [selected])

  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
      <div className="space-y-4">

        {shippingList.map((shipping) => (
          <RadioGroup.Option
            key={shipping.id}
            value={shipping.id}
            className={({ active }) =>
              classNames(
                active ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300',
                'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span className="flex items-center">
                  <span className="flex flex-col text-sm">
                    <RadioGroup.Label as="span" className="font-medium text-gray-900">
                      {shipping.destination.route}
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span" className="text-gray-500">
                      <span className="block sm:inline">
                        {shipping.receiver_address}
                      </span>
                      {/* {' '}
                      <span className="hidden sm:mx-1 sm:inline" aria-hidden="true">
                        &middot;
                      </span>{' '}
                      <span className="block sm:inline">{plan.disk}</span> */}
                    </RadioGroup.Description>
                  </span>
                </span>
                <RadioGroup.Description
                  as="span"
                  className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                >


                </RadioGroup.Description>
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-indigo-600' : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-lg'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
