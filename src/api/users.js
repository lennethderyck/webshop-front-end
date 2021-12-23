import {
    axios
} from '.';

//Signs a person in
export const login = async (email, password) => {
    const {
        data
    } = await axios.post('users/login', {
        email,
        password,
    });
    console.log(data.message);
    return data;
}

//Sign up a user
export const register = async (name, email, password) => {
    const {
        data
    } = await axios.post('users/register', {
        name,
        email,
        password,
    });
    return data;
}

//Get a user by given ID
export const getUserById = async (id) => {
    const {
        data
    } = await axios.get(`users/${id}`);
    return data;
}

//Get all the users
export const allUsers = async () => {
    const {
        data
    } = await axios.get('users');
    return data;
}