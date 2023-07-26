import axios from "axios";
import {useQuery} from "@tanstack/react-query";

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
    queryKey: ['todos'],
    queryFn: fetchTodos
});
export default useTodos