import { gql } from '@apollo/client'

export const FETCH_BUILDINGS = gql`
    query {
        Buildings {
            name
            meetingRooms{
              name
              meetings{
                title
                date
                startTime
                endTime
              }
            }
        }
    }
`

export const FETCH_MEETING_ROOMS = gql`
    query {
        MeetingRooms {
            name
            floor
            building{
                name
            }
            meetings{
                title
            }
        }
    }
`