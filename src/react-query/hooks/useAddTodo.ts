import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Todo} from "./useTodos";
import {CACHE_KEY_TODOS} from "../constanst";
import APIClient from "../services/apiClient";

const api = new APIClient<Todo>('/todos')

interface AddTodoCtx {
    previousTodos: Todo[]
}

const useAddTodo = (onAdd: ()=> void) => {

    const queryClient = useQueryClient();
    return useMutation<Todo, Error, Todo, AddTodoCtx>({
        mutationFn: api.create,
        onMutate: (newTodo: Todo) => {
            const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || []
            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
                newTodo,
                ...todos
            ]);

            // if (ref.current) ref.current.value = '';
            onAdd();

            // Here we're returning the ctx
            return {previousTodos}
        },
        // savedTodo: will receive from the backend
        // newTodo: you've created on the client
        onSuccess: (savedTodo, newTodo) => {
            console.log(savedTodo)
            queryClient.setQueryData<Todo[]>(
                ['todos'],
                (todos) => todos?.map(todo => todo === newTodo ? savedTodo : todo)
            )
            // APPROACH 1: Invalidating the cache
            // queryClient.invalidateQueries({
            //     queryKey: ['todos']
            // })

            // APPROACH 2: Updating data in the cache directly
            // queryClient.setQueryData<Todo[]>(['todos'], todos => [savedTodo, ...(todos || [])]);
            // if (ref.current) ref.current.value = ''
        },
        // error: Error response from the server
        // newTodo: created in the frontend
        // ctx: Context, is an object that we created to pass data between our callbacks, includes the previous todos before we're updated the catch
        onError: (error, newTodo, ctx) => {
            if (!ctx) return;

            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, ctx.previousTodos)
        }
    });
}

export default useAddTodo;