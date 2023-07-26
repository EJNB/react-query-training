import axios, {all} from "axios";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface PostQuery {
    pageSize: number
}

const usePosts = (query: PostQuery) => {
    return useInfiniteQuery<Post[], Error>({
        queryKey: ['todos', query],
        queryFn: ({ pageParam = 1 }) =>
            axios
                .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _start: (pageParam - 1) * query.pageSize,
                        _limit: query.pageSize
                    }
                })
                .then(res => res.data),
        staleTime: 10 * 1000,
        keepPreviousData: true,
        // When implement infiniteQuery we should implement this function
        getNextPageParam: (lastPage, allPages)=> {
            return lastPage.length > 0 ? allPages.length + 1 : undefined
        }
    });
}
export default usePosts