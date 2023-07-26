import {useQuery} from "@tanstack/react-query";
import {CACHE_KEY_TODOS} from "../constanst";
import todoServices, {Todo} from "../services/todoServices";

const useTodos = () => useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoServices.getAll
});
export default useTodos