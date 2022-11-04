/* eslint-disable import/no-anonymous-default-export */
import { ADD_TEAM_MEMBER_START, ADD_TEAM_MEMBER_SUCCESS, ADD_TEAM_MEMBER_ERROR,
        GET_TEAM_MEMBERS_START, GET_TEAM_MEMBERS_SUCCESS, GET_TEAM_MEMBERS_ERROR } from "../Actions/Types";

const initialState = {
    response:'',
    error:'',
    loadingAddTeamMember:false,
    loadingGetTeamMembers:false
}

export default function(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case ADD_TEAM_MEMBER_START:
            return {
                ...state,
                loadingAddTeamMember:true
            }
        case ADD_TEAM_MEMBER_SUCCESS:
            return {
                ...state,
                loadingAddTeamMember:false,
                response:payload
            }
        case ADD_TEAM_MEMBER_ERROR:
            return {
                ...state,
                loadingAddTeamMember:false,
                error:payload
            }
        case GET_TEAM_MEMBERS_START:
            return {
                ...state,
                loadingGetTeamMembers:true
            }
        case GET_TEAM_MEMBERS_SUCCESS:
            return {
                ...state,
                loadingGetTeamMembers:false,
                response:payload
            }
        case GET_TEAM_MEMBERS_ERROR:
            return {
                ...state,
                loadingGetTeamMembers:false,
                error:payload
            }     
        default:
            return state
    }
}