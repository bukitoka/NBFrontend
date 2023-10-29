import { Menu, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import ReactCountryFlag from "react-country-flag"

export default function LanguageOption() {
  const { t, i18n } = useTranslation()
  const [flag, setFlag] = useState("en")

  const handleMenuItemClick = (selectedLanguage) => {
    localStorage.setItem("language", selectedLanguage)
    i18n.changeLanguage(selectedLanguage)
    if (selectedLanguage === "en") {
      setFlag("GB")
    } else {
      setFlag("ID")
    }
  }

  useEffect(() => {
    const language = localStorage.getItem("language")
    if (language) {
      i18n.changeLanguage(language)
      if (language === "en") {
        setFlag("GB")
      } else {
        setFlag("ID")
      }
    } else {
      i18n.changeLanguage("en")
      setFlag("GB")
    }
  }, [])

  return (
    <div className="hidden lg:flex lg:ml-6 text-gray-200 hover:text-yellow-500">
      <Menu as="div" className="relative inline-block text-left">
        {({ open, close }) => (
          <div
            onMouseEnter={({ target }) => (open ? "" : target.click())}
            onMouseLeave={() => (open ? close() : "")}
          >
            <Menu.Button className="flex items-center w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-200 hover:text-yellow-500 outline-none focus:outline-none">
              <ReactCountryFlag
                countryCode={flag}
                svg
                className="mr-1"
                style={{
                  width: "1.5em",
                  height: "1.5em",
                }}
                title="Language"
              />
              <span className="text-sm font-medium ml-2">
                {" "}
                {t("navbarLanguageLabel")}{" "}
              </span>
            </Menu.Button>
            <Transition
              as={Fragment}
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute w-[150px] -ml-4 rounded-md bg-white shadow-lg focus:outline-none">
                <div className="p-2 font-medium">
                  <Menu.Item className="mb-1">
                    <button
                      className={`${
                        flag === "GB"
                          ? " bg-gray-200 text-gray-700"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-200"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => handleMenuItemClick("en")}
                    >
                      <ReactCountryFlag
                        countryCode="GB"
                        svg
                        className="mr-2"
                        style={{
                          width: "1.5em",
                          height: "1.5em",
                        }}
                        title="English"
                      />
                      English
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      className={`${
                        flag === "ID"
                          ? " bg-gray-200 text-gray-700"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-200"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => handleMenuItemClick("idn")}
                    >
                      <ReactCountryFlag
                        countryCode="ID"
                        svg
                        className="mr-2"
                        style={{
                          width: "1.5em",
                          height: "1.5em",
                        }}
                        title="Indonesia"
                      />
                      Indonesia
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </div>
        )}
      </Menu>
    </div>
  )
}
