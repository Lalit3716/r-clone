/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import ThemePicker from "components/ThemePicker";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

interface IProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const Navbar: React.FC<IProps> = ({ theme, setTheme }) => {
  const { data: session } = useSession();

  return (
    <Popover className="relative bg-primary-nav text-primary-nav">
      <div className="max-w-10xl mx-auto px-4">
        <div className="flex justify-between items-center border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <div className="cursor-pointer">
              <Link href="/">
                <span className="font-bold text-3xl">RClone</span>
              </Link>
            </div>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-primary-nav rounded-md p-2 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <ThemePicker theme={theme} setTheme={setTheme} className="mx-4" />
            <div className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-inverse-nav bg-indigo-600 hover:bg-indigo-700">
              {!session?.user ? (
                <Link href="/auth">Log In</Link>
              ) : (
                <button onClick={() => signOut()}>Log Out</button>
              )}
            </div>
            {session?.user && (
              <img
                src={session.user.image || ""}
                alt={session.user.name || ""}
                className="ml-5 h-12 w-12 rounded-full"
              />
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-black">RClone</p>
                  <p className="text-gray-500 text-md">
                    Welocme to RClone, a open source Reddit Clone!
                  </p>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>

            <div className="p-3">
              <ThemePicker
                theme={theme}
                setTheme={setTheme}
                className="w-full mb-2"
              />
              {!session?.user ? (
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-inverse-nav bg-indigo-600 hover:bg-indigo-700"
                >
                  Log In
                </a>
              ) : (
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-inverse-nav bg-indigo-600 hover:bg-indigo-700"
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navbar;
