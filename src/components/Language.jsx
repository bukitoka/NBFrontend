import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import {
  LanguageIcon,
} from "@heroicons/react/24/outline"
import { useTranslation } from 'react-i18next'

export default function LanguageOption() {
  const { t, i18n } = useTranslation();

  const handleMenuItemClick = (selectedLanguage) => {
    localStorage.setItem('language', selectedLanguage)
    i18n.changeLanguage(selectedLanguage)
  }

  return (
    <div className="hidden lg:flex lg:ml-6 text-gray-200 hover:text-yellow-500">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:text-yellow-500">
            <LanguageIcon className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm font-medium ml-2"> {t('navbarLanguageLabel')} </span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? ' bg-yellow-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => handleMenuItemClick('idn')}
                  >
                    Indonesia
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? ' bg-yellow-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => handleMenuItemClick('en')}
                  >
                    English
                  </button>
                )}
              </Menu.Item>
            </div>

          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
