import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "utils/trpc";
import { authOptions } from "pages/api/auth/[...nextauth]";

interface IProps {}

const Home: React.FC<IProps> = () => {
  const { data } = trpc.useQuery([
    "api.hello",
    {
      text: "world",
    },
  ]);
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="text-emerald-600">
        <div>You are not signed in!</div>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div className="text-emerald-600">
      <div>You are signed in as {session.user?.name}</div>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  return {
    props: {
      session,
    },
  };
};

export default Home;
