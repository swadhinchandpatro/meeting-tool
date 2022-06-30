import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useId, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { selectRoom, updateMeetingCreationStatus } from '../../actions'
import { computeRoomsStatus, constructDateObj, populateFloorDetails } from '../../controllers'
import { FETCH_MEETING_ROOMS } from '../../GraphQL/Queries'
import { CREATE_MEETING } from '../../GraphQL/Mutations'
import { isEmpty, uniqueId } from 'lodash'
import { v4 } from 'uuid'

import './styles.scss'
import { FAILED, SUCCESS } from '../../constants'

export default function RoomSelection() {
    const { loading: loadingRooms, data: roomsData, error } = useQuery(FETCH_MEETING_ROOMS)

    const [createMeeting, {loading: createLoading, error: createError, data: createData}] = useMutation(CREATE_MEETING)
    
    const { isModalOpen, buildingData, title, date, startTime, endTime, meetingRoomId, building} = useSelector(store => {
        const { createStatus, ...rest} = store;
        return rest;
    })
    const dispatch = useDispatch();

    const computeFreeRooms = useMemo(() => computeRoomsStatus(...constructDateObj(date, startTime, endTime)), [date, startTime, endTime])

    useEffect(() => {
        if(createError) {
            dispatch(updateMeetingCreationStatus(FAILED))
        } else if(createData) {
            dispatch(updateMeetingCreationStatus(SUCCESS))
        }
    }, [createData, createError])

    const callSubmitMeeting = () => {
        createMeeting({variables: { title, date, startTime, endTime, meetingRoomId}})
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
                    <div className='heading'>
                        Please select one of the Free Rooms
                    </div>
                    {loadingRooms && <div className='center'>Loading...</div>}
                    {!loadingRooms && 
                        <div className='rooms-container'>
                            {freeRoomsWithFloor.map(room => {
                                const className = room.name === meetingRoomId ? 'display-block selected' : 'display-block'
                                return (
                                <div key={room.name} onClick={(e) => { dispatch(selectRoom(room.name))} } className={className}>
                                    <div className='heading'>{room.name}</div> 
                                    <div>{room.building?.name}</div>
                                    <div>Floor {room.floor}</div>
                                </div>
                                )
                            })}
                        </div>
                    }
                    <button disabled={createLoading} onClick={callSubmitMeeting} className='save-btn'>
                        { createLoading ? 'Loading...' : 'Save' }
                    </button>
                </div>
            </div>
        </div>
    )
}
