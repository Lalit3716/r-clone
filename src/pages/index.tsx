import Link from "next/link";
import react from "react";
interface IProps {}

const Home: React.FC<IProps> = () => {
  return (
    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-primary sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Work In Progress! </span>
          <span className="block text-indigo-600 xl:inline">
            Clone Like Pro
          </span>
        </h1>
        <p className="mt-3 text-base text-secondary sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          This is a work in progress and it is a clone of reddit/quora like
          applications but with little bit of my own creativity.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow cursor-pointer">
            <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
              <Link href="/auth">Get started</Link>
            </div>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <a
              href="https://github.com/Lalit3716/r-clone"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
            >
              See the code on GitHub
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
