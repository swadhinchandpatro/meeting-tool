import { useQuery } from '@apollo/client'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux/es/exports'
import { computeRoomsStatus, constructDateObj, populateFloorDetails } from '../../controllers'
import { FETCH_MEETING_ROOMS } from '../../GraphQL/Queries'

import './styles.scss'

export default function RoomSelection() {
    const { loading: loadingRooms, data: roomsData, error } = useQuery(FETCH_MEETING_ROOMS)

    const { isModalOpen, buildingData, date, startTime, endTime} = useSelector(store => ({
        isModalOpen: store.isModalOpen,
        buildingData: store.buildingData,
        date: store.date,
        startTime: store.startTime,
        endTime: store.endTime
    }))
    const computeFreeRooms = useMemo(() => computeRoomsStatus(...constructDateObj(date, startTime, endTime)), [date, startTime, endTime])

    const freeRoomsWithFloor = useMemo(() => {
        const [freeRooms] = computeFreeRooms(buildingData)
        return populateFloorDetails(roomsData, freeRooms);
    }, [buildingData, date, startTime, endTime])
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
                                <div key={room.name} className='display-block'>
                                    <div className='heading'>{room.name}</div> 
                                    <div>{room.building?.name}</div>
                                    <div>Floor {room.floor}</div>
                                </div>
                            })}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
