import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {CACHE_KEY_TODOS} from "../constanst";

import APIClient from "../services/apiClient";

const api = new APIClient<Todo>('/todos')

export interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
}

const useTodos = () => useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: api.getAll
});
export default useTodos