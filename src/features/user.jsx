import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {selectUser} from '../utils/selector';

const initialState = {
    status: 'void',
    data: null,
    error: null
};

const { actions, reducer } = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        fetching: (draft, action) => {
            if(draft.status === 'void'){
                draft.status = 'pending';
                return;
            };
            if(draft.status === 'rejected'){
                draft.error = null;
                draft.status = 'pending';
                return
            };
            if(draft.status === 'resolved'){
                draft.status = 'updating';
                return
            };
            return;
        },
        resolved: {
            prepare: (userData, token) => ({ payload: {userData, token} }),
            reducer: (draft, action) => {
                if(draft.status === 'pending' || draft.status === 'updating'){
                    draft.data = action.payload;
                    draft.status = 'resolved';
                    return;
                }
                return;
            },
        },
        rejected: {
            prepare: (error) => ({ payload: {error} }),
            reducer: (draft, action) => {
                if(draft.status === 'pending' || draft.status === 'updating'){
                    draft.error = action.payload.error;
                    draft.data = null;
                    draft.status = 'rejected';
                    return;
                }
                return;
            },
        },
        logout: (draft, action) => {
            draft.status = 'void';
            draft.data = null;
            draft.error = null;
            return;
        },
        signup: {
            prepare: (message) => ({ payload: {message} }),
            reducer: (draft, action) => {
                if(draft.status === 'pending' || draft.status === 'updating'){
                    draft.data = action.payload.message;
                    draft.status = 'void';
                    draft.error = null;
                    return;
                }
                return;
            },
        },
    },
});

export const { fetching, resolved, rejected, logout, signup } = actions;

export function loginUser(form){
    return async (dispatch, getState) => {
        const status = selectUser(getState()).status;
        if(status === 'pending' || status === 'updating') return;
        dispatch(fetching());
        axios.post('http://localhost:4200/api/auth/login', form)
            .then(res => {
                dispatch(resolved(form ,res.data))

            })
            .catch(error => {
                dispatch(rejected(error.response.data.message))
            });
    }
}

export function signupUser(form){
    return async (dispatch, getState) => {
        const status = selectUser(getState()).status;
        if(status === 'pending' || status === 'updating') return;
        dispatch(fetching());
        axios.post('http://localhost:4200/api/auth/signup', form)
            .then(res => {
                dispatch(signup(res.data))
            })
            .catch(error => {
                dispatch(rejected(error.response.data.message))
            });
    }
}

export default reducer;