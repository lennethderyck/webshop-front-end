import {
    axios
} from '.';

//Gives all the paintings
export const getAllPaintings = async () => {
    const {
        data
    } = await axios.get('paintings', {
        params: {
            limit: 100,
            offset: 0,
        },
    });
    return data;
};

//Gives paintings by given ID
export const getPaintingById = async (id) => {
    const {
        data
    } = await axios.get(`paintings/${id}`);
    return data;
};

//Create/update e painting
export const savePainting = async ({
    id,
    name,
    type,
    price,
    size,
    description,
    img
}) => {
    const {
        data
    } = await axios({
        method: id ? 'put' : 'post',
        url: `paintings/${id ?? ''}`,
        data: {
            name,
            type,
            price,
            size,
            description,
            img
        },
    });
    return data;
};

//Delete a painting
export const deletePainting = async (id) => {
    await axios.delete(`paintings/${id}`);
};