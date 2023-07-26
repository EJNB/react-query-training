import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {CACHE_KEY_TODOS} from "../constanst";

export interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
}

const fetchTodos = () =>
    axios
        .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.data)
const useTodos = () => useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: fetchTodos
});
export default useTodos