import React, { useMemo } from 'react'
import { computeBuildingCount, computeRoomsCount, computeRoomsStatus } from '../../controllers'
import './styles.scss'

 function MeetingSummary({data}) {
    const computeFreeRoomsNow = computeRoomsStatus(new Date())
    const [freeRooms, _busyRooms, meetingForTheDay, meetingOnTIme] = useMemo(() => computeFreeRoomsNow(data), [data]) ;
    return (
        <div className='meeting-summary'>
            <div className='display-block'>
                <div className='heading'>Buildings</div> 
                <div>Total {computeBuildingCount(data)}</div>
            </div>
            <hr />
            <div className='display-block'>
                <div className='heading'>Rooms</div>
                <div>Total {computeRoomsCount(data)}</div>
                <div>Free Now {freeRooms.length}</div>
            </div>
            <hr />
            <div className='display-block'>
                <div className='heading'>Meetings</div> 
                <div>Total {meetingForTheDay?.length} Today</div>
                <div>Total {meetingOnTIme?.length} Going on Now</div>
            </div>
        </div>
    )
}

export default MeetingSummary
