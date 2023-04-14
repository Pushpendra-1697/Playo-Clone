import axios from "axios";
import { backend_url } from '../../Pages/BackendURL';
import { ADD_EVENT, EVENT_ERROR, EVENT_LOADING, EVENT_SUCCESS } from "./event.type";

export const getEvents = (page = 1, eventName, q) => async (dispatch) => {
    dispatch({ type: EVENT_LOADING });
    try {
        let res = await axios.get(`${backend_url}/events/get?page=${page}&limit=10&name=${eventName}&q=${q}`);
        console.log(res.data);
        dispatch({ type: EVENT_SUCCESS, payload: res.data });
    } catch (e) {
        dispatch({ type: EVENT_ERROR, payload: e.message });
    }
};

export const addEvent = (message) => async (dispatch) => {
    dispatch({ type: EVENT_LOADING });
    try {
        let res = await axios.post(`${backend_url}/events/post`, message, { headers: { token: localStorage.getItem('token') } });
        if (res.data.status == "NO") {
            alert(`${res.data.msg}`);
            return;
        } else {
            alert(`${res.data.msg}`);
        }
        dispatch({ type: ADD_EVENT, payload: res.data.event });
    } catch (e) {
        dispatch({ type: EVENT_ERROR, payload: e.message });
    }
};
// Note: In post and patch requests always gives object after url of json-server or api url; here message and changes both are objects which comes different-2 files;
// export const updateUser = (id, changes) => async (dispatch) => {
//     dispatch({ type: USER_LOADING });
//     try {
//         let res = await axios.put(`${backend_url}/users/${id}`, {
//             ...changes
//         });
//         dispatch({ type: UPDATE_USER, payload: res.data.user });
//     } catch (e) {
//         dispatch({ type: USER_ERROR, payload: e.message });
//     }
// };

// export const deleteUser = (id) => async (dispatch) => {
//     dispatch({ type: USER_LOADING });
//     try {
//         let res = await axios.delete(`${backend_url}/users/${id}`);
//         dispatch({ type: REMOVE_USER, payload: res.data.user._id });
//     } catch (e) {
//         dispatch({ type: USER_ERROR, payload: e.message });
//     }
// };