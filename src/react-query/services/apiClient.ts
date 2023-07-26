import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export default class APIClient<T> {
    endpoint: string

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }
     getAll = () => {
        return axiosInstance
            .get<T[]>(this.endpoint)
            .then(res=> res.data)
    }

    create = (data: T) => {
        return axiosInstance
            .post<T>(this.endpoint, data)
            .then(res => res.data);
    }
}

