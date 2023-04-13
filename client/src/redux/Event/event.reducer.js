import { ADD_EVENT, EVENT_ERROR, EVENT_LOADING, EVENT_SUCCESS } from "./event.type";

const initialState = {
    events: [],
    error: false,
    loading: false
};
export const eventReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_EVENT: {
            return {
                ...state,
                loading: false,
                events: [...state.events, payload]
            }
        }
        case EVENT_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case EVENT_ERROR: {
            return {
                ...state,
                loading: false,
                error: payload || true
            }
        }
        case EVENT_SUCCESS: {
            return {
                ...state,
                loading: false,
                events: payload
            }
        }
        // case UPDATE_USER: {
        //     const updatedUsers = state.users.map((ele) => {
        //         if (ele._id === payload._id) {
        //             return {
        //                 ...ele,
        //                 ...payload
        //             }
        //         }
        //         return ele;
        //     })
        //     return {
        //         ...state,
        //         loading: false,
        //         users: updatedUsers
        //     }
        // }
        // case REMOVE_USER: {
        //     let filteredUsers = state.users.filter(
        //         (ele) => ele._id !== payload
        //     )
        //     return {
        //         ...state,
        //         loading: false,
        //         users: filteredUsers
        //     }
        // }
        default: {
            return state;
        }
    }
}