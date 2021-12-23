import {
    axios
} from '.';

//Get all the orders
export const getAllOrders = async () => {
    const {
        data
    } = await axios.get('orders', {
        params: {
            limit: 100,
            offset: 0,
        },
    });
    return data;
};

//Get the orders from the user that is signed in
export const getMyOrders = async (id) => {
    const {
        data
    } = await axios.get(`orders/mine/${id}`);
    return data;
};

//Create or update an order
export const saveOrder = async ({
    id,
    paintings,
    total,
    user_id,
    date,
}) => {
    const {
        data
    } = await axios({
        method: id ? 'put' : 'post',
        url: `orders/${id ?? ''}`,
        data: {
            paintings,
            total,
            user_id,
            date,
        },
    });
    return data;
};