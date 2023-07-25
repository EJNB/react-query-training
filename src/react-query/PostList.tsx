import usePosts from "./hooks/usePosts";

const PostList = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [error, setError] = useState('');
  //
  // useEffect(() => {
  //   axios
  //     .get('https://jsonplaceholder.typicode.com/posts')
  //     .then((res) => setPosts(res.data))
  //     .catch((error) => setError(error));
  // }, []);

  const { data: posts, error, isLoading } = usePosts();

  if (error) return <p>{error.message}</p>;

  return (
    <ul className="list-group">
      {posts?.map((post) => (
        <li key={post.id} className="list-group-item">
          {post.title}
        </li>
      ))}
    </ul>
  );
};

export default PostList;
