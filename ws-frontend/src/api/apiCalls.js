import axios from "axios"

export const signup = (body) => {
    return axios.post('/api/1.0/users', body);
}

export const login = creds => {
    {
        //creds objesi, içinde username ve password olan obje
        return axios.post('/api/1.0/auth', {}, { auth: creds })
    }
}