import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { selectSerieDetail } from "../utils/selector";

const initialState = {
    status: 'void',
    data: null,
    error: null
};

const { actions, reducer } = createSlice({
    name: 'serieDetail',
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
                    draft.data = null;
                    draft.status = 'rejected';
                    return;
                }
                return;
            },
        },
    }
})

export const { fetching, resolved, rejected } = actions;

export function querySerieDetail(serieId){
    return async (dispatch, getState) => {
        const status = selectSerieDetail(getState()).status;
        if(status === 'pending' || status === 'updating') return;
        dispatch(fetching());
        axios.get(`https://www.episodate.com/api/show-details?q=${serieId}`)
            .then(res => {
                dispatch(resolved(res.data))
            })
            .catch(error => {
                dispatch(rejected(error))
            });
    }
}

export default reducer;