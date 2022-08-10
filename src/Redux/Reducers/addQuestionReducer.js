/* eslint-disable import/no-anonymous-default-export */
import { ADD_QUESTION_ERROR, ADD_QUESTION_SUCCESS, ADD_QUESTION_START } from "../Actions/Types";

const initialState = {
    response:'',
    error:'',
    loading:false
}

export default function(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case ADD_QUESTION_START:
            return {
                ...state,
                loading:true
            }
        case ADD_QUESTION_SUCCESS:
            return {
                ...state,
                loading:false,
                response:payload
            }
        case ADD_QUESTION_ERROR:
            return {
                ...state,
                loading:false,
                error:payload
            }
        default:
            return state
    }
}