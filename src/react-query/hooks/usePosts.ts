import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Todo} from "./useTodos";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

const fetchPosts = () =>
    axios
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.data)
const usePosts = () => useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts
});
export default usePosts