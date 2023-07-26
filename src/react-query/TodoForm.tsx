import {useRef} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Todo} from "./hooks/useTodos";
import axios from "axios";

interface AddTodoCtx {
    previousTodos: Todo[]
}

const TodoForm = () => {
    const queryClient = useQueryClient();
    const ref = useRef<HTMLInputElement>(null);
    const addTodo = useMutation<Todo, Error, Todo, AddTodoCtx>({
        mutationFn: (todo: Todo) =>
            axios
                .post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
                .then(res => res.data),
        onMutate: (newTodo: Todo) => {
            const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || []
            queryClient.setQueryData<Todo[]>(['todos'], todos => [
                newTodo,
                ...(todos || [])
            ]);

            if (ref.current) ref.current.value = '';

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

            queryClient.setQueryData<Todo[]>(['todos'],ctx.previousTodos)
        }
    })

    return (
        <>
            {addTodo.error && <div className="alert alert-danger">{addTodo.error.message}</div>}
            <form className="row mb-3" onSubmit={(event) => {
                event.preventDefault();

                if (ref.current && ref.current.value)
                    addTodo.mutate({
                        id: 0,
                        title: ref.current.value,
                        completed: true,
                        userId: 1
                    })
            }}>
                <div className="col">
                    <input ref={ref} type="text" className="form-control"/>
                </div>
                <div className="col">
                    <button disabled={addTodo.isLoading}
                            className="btn btn-primary">{addTodo.isLoading ? 'Adding...' : 'Add'}</button>
                </div>
            </form>
        </>
    );
};

export default TodoForm;
