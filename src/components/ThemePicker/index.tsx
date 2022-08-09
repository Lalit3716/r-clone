import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Themes } from "themes";

interface IProps {
  theme: string;
  setTheme: (theme: string) => void;
  className?: string;
}

const ThemePicker: React.FC<IProps> = ({ theme, setTheme, className }) => {
  const [originalTheme, setOriginalTheme] = useState(theme);

  return (
    <Menu as="menu">
      <Menu.Button
        className={
          "whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-inverse-nav bg-indigo-600 hover:bg-indigo-700 " +
          className
        }
      >
        Change Theme
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute z-10 w-36 top-20"
          onMouseLeave={() => setTheme(originalTheme)}
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
              {Object.entries(Themes).map((entry) => (
                <>
                  <Menu.Item>
                    <div
                      key={entry[0]}
                      className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-100 cursor-pointer"
                      onMouseEnter={() => setTheme(entry[1])}
                      onClick={() => setOriginalTheme(entry[1])}
                    >
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">
                          {entry[0]}
                        </p>
                      </div>
                    </div>
                  </Menu.Item>
                </>
              ))}
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ThemePicker;
