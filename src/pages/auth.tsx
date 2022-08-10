import react from "react";
import { getProviders, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
import { inferAsyncReturnType } from "@trpc/server";

interface IProps {
  providers: inferAsyncReturnType<typeof getProviders>;
}

const AuthPage: React.FC<IProps> = ({ providers }) => {
  if (!providers) {
    return <div>No providers found</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-6 mt-10 py-10">
      {Object.values(providers).map((provider) => (
        <button
          key={provider.id}
          onClick={() =>
            signIn(provider.id, {
              callbackUrl: "/",
            })
          }
          className="max-w-xl group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue with {provider.name}
        </button>
      ))}
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
