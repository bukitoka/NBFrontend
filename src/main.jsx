import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./main.css"
import "react-loading-skeleton/dist/skeleton.css"
import "react-datepicker/dist/react-datepicker.css"
import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"
import "flowbite/dist/datepicker.js"
import "react-toastify/dist/ReactToastify.css"
import { Toaster } from "react-hot-toast"
import "../i18n"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <App />
  </React.StrictMode>
)
