export const computeBuildingCount = (data) => {
    return data?.Buildings?.length || '--';
}

export const computeRoomsCount = (data) => {
    return data?.Buildings?.reduce((rooms, building) => {
        return rooms + building.meetingRooms.length
    }, 0) || '--';
}


export const constructDateObj = (date, startTime, endTime) => {
    if(!date) return ['', '']
    let year, month, day
    if(date.includes('/')) {
        [day, month, year] = date.split('/');
    } else {
        [year, month, day] = date.split('-');
    }
    let startDate = new Date(`${year}-${month}-${day}T${startTime}`)
    let endDate = endTime && new Date(`${year}-${month}-${day}T${endTime}`)

    return [startDate, endDate];
}

export const populateFloorDetails = (data, freeRooms) => {
    if(!data?.MeetingRooms?.length || !freeRooms?.length) return []
    return data?.MeetingRooms?.filter(room => {
        return freeRooms.some(freeRoom => freeRoom?.name === room?.name)
    })
}

export const computeRoomsStatus = (date, toDate) => {
    return (data, evaluate = () => true) => {
        const freeRooms = [], busyRooms = [], meetingOnTIme = [], meetingForTheDay = [];
        if(Object.keys(data).length && date) {
            data?.Buildings?.filter(evaluate).forEach(building => {
                const meetingRooms = building.meetingRooms || [];
                meetingRooms.forEach(room => {
                    const meetings = room.meetings || []
                    const isFree = meetings.every(meeting => {
                        const [startDate, endDate] = constructDateObj(meeting.date, meeting.startTime, meeting.endTime)
                        return toDate ? date > endDate || toDate < startDate : date > endDate || date < startDate
                    })
                    if(isFree) {
                        freeRooms.push(room)
                    } else {
                        busyRooms.push(room);
                    }
    
                    const onGoingMeeting = meetings.filter(meeting => {
                        const [startDate, endDate] = constructDateObj(meeting.date, meeting.startTime, meeting.endTime)
                        return date < endDate && date > startDate
                    })
                    meetingOnTIme.concat(onGoingMeeting);
    
                    meetings.forEach(meeting => {
                        const [startDate] = constructDateObj(meeting.date, meeting.startTime)
                        if(startDate.toISOString().split('T')[0] === date.toISOString().split('T')[0]) {
                            meetingForTheDay.push(meeting);
                        }
                    })
                })
            })
        }
        return [freeRooms, busyRooms, meetingForTheDay, meetingOnTIme]
    }
}