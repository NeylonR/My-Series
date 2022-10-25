import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {selectUser} from '../utils/selector';

const initialState = {
    status: 'void',
    data: null,
    error: null
};

const { actions, reducer } = createSlice({
    name: 'userSeriesList',
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
        resolved: (draft, action) => {
            if(draft.status === 'pending' || draft.status === 'updating'){
                draft.data = action.payload;
                draft.status = 'resolved';
                return;
            }
            return;
        },
        rejected: {
            prepare: (error) => ({ payload: {error} }),
            reducer: (draft, action) => {
                if(draft.status === 'pending' || draft.status === 'updating'){
                    draft.error = action.payload.error;
                    // draft.data = null;
                    draft.status = 'rejected';
                    return;
                }
                return;
            },
        },
        addSerie: {
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

export const { fetching, resolved, rejected, addSerie } = actions;

export function fetchList(token){
    return async (dispatch, getState) => {
        const status = selectUser(getState()).status;
        if(status === 'pending' || status === 'updating') return;
        dispatch(fetching());
        axios.post('http://localhost:4200/api/userSeriesList', {}, 
        {headers:{"Authorization" : `Bearer ${token}`}})
            .then(res => {
                dispatch(resolved(res.data))
            })
            .catch(error => {
                dispatch(rejected(error))
            });
    }
};

export function addToList(serieId, image_url, name, formSelect, token){
    return async (dispatch, getState) => {
        const status = selectUser(getState()).status;
        if(status === 'pending' || status === 'updating') return;
        dispatch(fetching());
        axios.post(`http://localhost:4200/api/userSeriesList/${serieId}`, {formSelect: formSelect, image_url: image_url, name: name}, 
        {headers:{"Authorization" : `Bearer ${token}`}})
            .then(res => {
                dispatch(addSerie(res.data))
            })
            .catch(error => {
                dispatch(rejected(error.response.data.message))
            });
    }
};

export function editList(serieId, formSelect, token){
    return async (dispatch, getState) => {
        const status = selectUser(getState()).status;
        if(status === 'pending' || status === 'updating') return;
        dispatch(fetching());
        axios.put(`http://localhost:4200/api/userSeriesList/${serieId}`, {formSelect: formSelect}, 
        {headers:{"Authorization" : `Bearer ${token}`}})
            .then(res => {
                dispatch(resolved(res.data))
            })
            .catch(error => {
                dispatch(rejected(error.response.data.message))
            });
    }
};

export function deleteFromList(serieId, serie_Id, token){
    return async (dispatch, getState) => {
        const status = selectUser(getState()).status;
        if(status === 'pending' || status === 'updating') return;
        dispatch(fetching());
        axios.post(`http://localhost:4200/api/userSeriesList/delete/${serieId}`, { serie_Id: serie_Id }, 
        {headers:{"Authorization" : `Bearer ${token}`}})
            .then(res => {
                dispatch(resolved(res.data))
            })
            .catch(error => {
                dispatch(rejected(error))
            });
    }
}

export default reducer;