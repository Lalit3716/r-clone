import { getProviders, signIn } from "next-auth/react";
import { inferAsyncReturnType } from "@trpc/server";
import { GetServerSideProps } from "next";

interface IProps {
  providers: inferAsyncReturnType<typeof getProviders>;
}

export default function SignIn({ providers }: IProps) {
  if (!providers) {
    return <div className="text-primary">Loading...</div>;
  }

  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="text-primary">
          <button
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "/",
              })
            }
            className="text-primary"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
