import { OPEN_ROOM_SELECTION, CLOSE_ROOM_SELECTION, STORE_BUILDING_DATA, SELECT_ROOM, MEETING_CREATION_STATUS } from "../constants"

export const openRoomSelection = (data) => {
    return {
        type: OPEN_ROOM_SELECTION,
        payload: { ...data, isModalOpen: true }
    }
}

export const selectRoom = (roomNo) => {
    return {
        type: SELECT_ROOM,
        payload: {meetingRoomId: roomNo}
    }
}

export const closeRoomSelection = () => {
    return {
        type: CLOSE_ROOM_SELECTION,
        payload: { isModalOpen: false }
    }
}

export const storeBuildingData = (data) => {
    return {
        type: STORE_BUILDING_DATA,
        payload: { buildingData: data }
    }
}

export const updateMeetingCreationStatus = (status) => {
    return {
        type: MEETING_CREATION_STATUS,
        payload: { createStatus: status, isModalOpen: false, meetingRoomId: ''}
    }
}