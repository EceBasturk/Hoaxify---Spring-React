import axios from "axios"

export const signup = (body) => {
    return axios.post('/api/1.0/users', body, { headers: { 'accept-language': 'tr' } });
}

export const login = creds => {
    return axios.post('/api/1.0/auth', {}, { auth: creds })
}

export const getUsers = (page = 0, size = 3) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
}

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
    if (isLoggedIn) {
        const authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
};

export const getUser = username => {
    return axios.get(`api/1.0/users/${username}`);
}

export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/users/${username}`, body);
};
export const postObje = obje => {
    return axios.post('/api/1.0/objes', obje);
};

export const getObjes = (username, page = 0) => {
    const path = username ? `/api/1.0/users/${username}/objes?page=` :
        `/api/1.0/objes?page=`;
    return axios.get(path + page);
}

export const getOldObjes = (id, username) => {
    return axios.get(username ? `/api/1.0/users/${username}/objes/${id}` : `/api/1.0/objes/${id}`);
};

export const getNewObjeCount = id => {
    return axios.get(`/api/1.0/objes/${id}?count=true`);
};