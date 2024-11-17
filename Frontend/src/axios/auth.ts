import axiosClient from "./axiosConfigs";
import { AuthType } from "./type/authType";

export const authAPI = {
    postLogin: async (params: AuthType) => {
        try {
            const response = await axiosClient.post('/auth/login', {
                email: params.email,
                password: params.password,
                role: params.role
            })
            console.log(response)
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}