import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { closeRoomSelection, selectRoom, unSelectRoom, updateMeetingCreationStatus } from '../../actions'
import { computeRoomsStatus, constructDateObj, populateFloorDetails } from '../../controllers'
import { FETCH_MEETING_ROOMS } from '../../GraphQL/Queries'
import { CREATE_MEETING } from '../../GraphQL/Mutations'
import { isEmpty } from 'lodash'
import './styles.scss'
import { FAILED, SUCCESS } from '../../constants'
import { useTokenWithMutation, useTokenWithQuery } from '../../controllers/api'
import { v4 } from 'uuid'

export default function RoomSelection() {
    const { loading: loadingRooms, data: roomsData, error } = useTokenWithQuery(FETCH_MEETING_ROOMS)

    const [createMeeting, {loading: createLoading, error: createError, data: createData}] = useTokenWithMutation(CREATE_MEETING)
    
    const { isModalOpen, buildingData, title, date, startTime, endTime, meetingRoomId, building} = useSelector(store => {
        const { createStatus, ...rest} = store;
        return rest;
    })
    const dispatch = useDispatch();

    const computeFreeRooms = useMemo(() => computeRoomsStatus(...constructDateObj(date, startTime, endTime)), [date, startTime, endTime])

    useEffect(() => {
        if(createError) {
            dispatch(updateMeetingCreationStatus(FAILED))
            console.log(createError)
        } else if(createData) {
            dispatch(updateMeetingCreationStatus(SUCCESS))
        }
    }, [createData, createError])

    const callSubmitMeeting = () => {
        createMeeting({variables: { id: v4(), title, date, startTime, endTime, meetingRoomId}})
    }

    const [freeRoomsWithFloor, setFreeRoomsWithFloor] = useState([]);
    useEffect(() => {
        if(isModalOpen && !isEmpty(roomsData) && !isEmpty(buildingData)) {
            const [freeRooms] = computeFreeRooms(buildingData, (buildingObj) => buildingObj.name === building)
            const freeRoomsWithFloor = populateFloorDetails(roomsData, freeRooms);
            setFreeRoomsWithFloor(freeRoomsWithFloor)
        }
    }, [isModalOpen, roomsData, buildingData, date, startTime, endTime])

    if (!isModalOpen) return null
    
    return (
        <div className='modal'>
            <div className='modal-container'>
                <div className='meeting-rooms'>
                    <div className='modal-action' onClick={() => dispatch(closeRoomSelection())}></div>
                    <div className='heading'>
                        Please select one of the Free Rooms
                    </div>
                    {loadingRooms && <div className='center'>Loading...</div>}
                    {!loadingRooms && 
                        <div className='rooms-container'>
                            {freeRoomsWithFloor.map(room => {
                                const className = room.id === meetingRoomId ? 'display-block selected' : 'display-block'
                                return (
                                <div key={room.name}
                                    onClick={(e) => {
                                        if(room.id !== meetingRoomId) {
                                            dispatch(selectRoom(room.id))
                                        } else {
                                            dispatch(unSelectRoom(room.id))
                                        }
                                    }} className={className}>
                                    <div className='heading'>{room.name}</div> 
                                    <div>{room.building?.name}</div>
                                    <div>Floor {room.floor}</div>
                                </div>
                                )
                            })}
                        </div>
                    }
                    <button disabled={createLoading} onClick={callSubmitMeeting} className={createLoading || !meetingRoomId ? 'disabled save-btn' : 'save-btn' }>
                        { createLoading ? 'Loading...' : 'Save' }
                    </button>
                </div>
            </div>
        </div>
    )
}
