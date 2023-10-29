import { XMarkIcon } from "@heroicons/react/24/solid"
import toast from "react-hot-toast"

const Error = ({ t, status, message }) => (
  <div
    className={`${
      t.visible ? "animate-enter" : "animate-leave"
    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <div className="flex-1 w-0 p-4">
      <div className="flex items-center">
        <div className="p-2 flex items-center align-middle h-10 w-10 rounded-full bg-red-100">
          <XMarkIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{status}</p>
          <p className="mt-1 text-sm text-gray-500">{message}</p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-gray-200">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-900 outline-none focus:outline-none"
      >
        Close
      </button>
    </div>
  </div>
)

export default Error
