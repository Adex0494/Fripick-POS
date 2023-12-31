import { baseUrl } from "./constants";
import axios from 'axios'; 

const getHeaders = (token, userId) => {
        return {
        'Content-Type': 'application/json',
        'userid': userId,
        'token': token,
        }
    }

export const getHttpResponse = async (url, token, userId) => {
    const headers = getHeaders(token, userId)
    const response = await axios.get(baseUrl + url, {headers});
    return response
}

export const postHttpResponse = async (url, body, token, userId) => {
    const headers = getHeaders(token, userId)
    const response = await axios.post(baseUrl + url, body, {headers});
    return response
}

export const postHttpAuthResponse = async (url, body) => {
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    const response = await axios.post(baseUrl + url, body, {headers});
    return response
}



