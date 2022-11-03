import { trpc } from "lib/trpc";
import { useState } from "react";

const Posts: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const query = trpc.useQuery(["post.posts", {}]);
  const mutation = trpc.useMutation("post.createPost", {
    onSuccess: () => query.refetch(),
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.error) {
    return <div>{query.error.message}</div>;
  }

  return (
    <div className="container p-5">
      <h1 className="text-6xl">Posts</h1>
      {query.data?.length === 0 && <div>No posts yet</div>}
      {query.data?.map((post) => (
        <div key={post.id} className="border-2 border-gray-200 p-5 m-5">
          <h2 className="text-4xl">{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}

      <div className="flex flex-col space-y-4 p-8 bg-gray-100 rounded-md md:w-1/2 w-full mt-8">
        <input
          className="border border-gray-300 p-2"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder="Title"
        />
        <textarea
          className="border border-gray-300 p-2"
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
          placeholder="Content"
        />
        <button
          className="bg-blue-500 text-white p-2"
          onClick={() => mutation.mutate({ content, title })}
          disabled={mutation.isLoading}
        >
          Create post
        </button>
      </div>
    </div>
  );
};

export default Posts;
