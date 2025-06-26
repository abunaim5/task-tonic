import axios from "axios";

const axiosPublic = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

const getAxiosPublic = () => {
    return axiosPublic;
};

export default getAxiosPublic;