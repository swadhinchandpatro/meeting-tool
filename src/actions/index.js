import { CHOOSE_ROOM, SHOW_BUILDING, STORE_BUILDING_DATA } from "../constants"

export const showBuilding = (payload) => {
    return {
        type: SHOW_BUILDING,
        payload: payload
    }
}

export const chooseRoom = () => {
    return {
        type: CHOOSE_ROOM,
        payload: { isModalOpen: true }
    }
}

export const storeBuildingData = (data) => {
    return {
        type: STORE_BUILDING_DATA,
        payload: { buildingData: data }
    }
}