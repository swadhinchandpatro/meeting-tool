import { OPEN_ROOM_SELECTION, CLOSE_ROOM_SELECTION, FAILED, STORE_BUILDING_DATA, SELECT_ROOM, MEETING_CREATION_STATUS } from "../constants"

const INITIAL_STATE = { buildingData: {}, title: '', date: '', startTime: '', endTime: '', meetingRoomId: -1, isModalOpen: false, createStatus: '', building: '' }

export default function meetingReducer (state = INITIAL_STATE, { type, payload }) {
    switch (type) {
        case STORE_BUILDING_DATA:
            return { ...state, ...payload }
        case OPEN_ROOM_SELECTION:
            return { ...state, ...payload }
        case SELECT_ROOM:
            return { ...state, ...payload }
        case CLOSE_ROOM_SELECTION:
            return { ...state, ...payload }
        case MEETING_CREATION_STATUS:
            if (payload.status === FAILED) {
                return { ...state, createStatus: payload.status }
            } else {
                return { ...INITIAL_STATE, createStatus: payload.status }
            }
        default:
            return state
    }
}