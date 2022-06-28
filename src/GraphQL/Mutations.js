import {gql} from '@apollo/client'

const CREATE_MEETING = gql`
mutation Meeting(
    $id: Number!
    $title: String!
    $date: String!
    $startTime: String!
    $endTime: String!
    $meetingRoomId: Number!
    ) {
        meeting(
            id: $id
            title: $title
            date: $date
            startTime: $startTime
            endTime: $endTime
            meetingRoomId: $meetingRoomId
        ) {
            id
            title
        }
}
`