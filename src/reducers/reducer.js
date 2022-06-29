import { CHOOSE_ROOM, FAILED, MEETING_CREATION, SHOW_BUILDING, STORE_BUILDING_DATA } from "../constants"

const INITIAL_STATE = { buildingData: {}, title: '', date: '', startTime: '', endTime: '', meetingRoomId: '', isModalOpen: false, createStatus: '' }

export default function meetingReducer (state = INITIAL_STATE, { type, payload }) {
    switch (type) {
        case STORE_BUILDING_DATA:
            return { ...state, ...payload }
        case CHOOSE_ROOM:
            return { ...state, ...payload }
        case MEETING_CREATION:
            if (payload.status === FAILED) {
                return { ...state, createStatus: payload.status }
            } else {
                return { ...INITIAL_STATE, createStatus: payload.status }
            }
        default:
            return state
    }
}