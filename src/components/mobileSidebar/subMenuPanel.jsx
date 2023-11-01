import React from "react"
import { Dialog, Transition } from "@headlessui/react"
import { ChevronLeftIcon } from "@heroicons/react/24/solid"

const SubMenuPanel = ({ open, onClose, title, children }) => {
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={onClose}>
        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={React.Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-0"
            enterTo="-translate-x-full"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="-translate-x-full"
            leaveTo="translate-x-0"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-lg px-3 py-2 text-zinc-600 hover:text-zinc-800 bg-zinc-100 hover:bg-zinc-200"
                  onClick={onClose}
                >
                  <span className="sr-only">Back</span>
                  <ChevronLeftIcon
                    className="h-5 w-5 mr-2"
                    aria-hidden="true"
                  />
                  Back
                </button>
              </div>
              <div className="border-b pt-6 px-5 pb-2">
                <p className="text-lg font-medium text-zinc-800">{title}</p>
              </div>
              <div className="px-4 py-2">
                <div className="space-y-1">{children}</div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SubMenuPanel
