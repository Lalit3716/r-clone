import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

interface IProps {}

const Home: React.FC<IProps> = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <div>You are not signed in!</div>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div>
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