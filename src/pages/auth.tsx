import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getProviders, signIn } from "next-auth/react";
import { inferAsyncReturnType } from "@trpc/server";
import { toast } from "react-toastify";
import { AuthErrors } from "utils/errors";

interface IProps {
  providers: inferAsyncReturnType<typeof getProviders>;
}

const AuthPage: React.FC<IProps> = ({ providers }) => {
  const { error } = useRouter().query;

  useEffect(() => {
    if (error) toast.error(AuthErrors[error as string]);
  }, [error]);

  if (!providers) {
    return <div>No providers found</div>;
  }

  return (
    <div className="flex-1 flex flex-col items-start md:items-center justify-center mx-auto px-2">
      <h1 className="text-4xl tracking-tight font-extrabold text-primary sm:text-5xl md:text-6xl">
        <span className="block xl:inline">Sign in to Continue to </span>
        <span className="block text-indigo-600 xl:inline">RClone</span>
      </h1>
      <p className="mt-3 text-base text-left md:text-center mb-6 text-secondary sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
        To continue to RClone, please sign in with one of the following
        providers.
      </p>
      <div className="space-y-5">
        {Object.values(providers).map((provider) => (
          <button
            key={provider.id}
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "/",
              })
            }
            className="w-44 md:w-56 group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue with {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default AuthPage;
