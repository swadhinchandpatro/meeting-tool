import React, { useEffect } from 'react'
import {  useDispatch } from 'react-redux';
import Form from '../../components/Form';
import MeetingSummary from '../../components/MeetingSummary';
import { useQuery } from '@apollo/client'
import { FETCH_BUILDINGS } from '../../GraphQL/Queries';
import { storeBuildingData } from '../../actions';

import './styles.scss'
const MeetingView = () => {
    const { loading, data, error } = useQuery(FETCH_BUILDINGS)
    
    const dispatch = useDispatch()
    // useEffect(() => {
    //     setBuildingData(buildingData);
    // }, [loading])

    useEffect(() => {
        if(data && !error) {
            dispatch(storeBuildingData(data))
        } else if(error){
            console.error(error)
        }
    }, [data, error])

    return (
        <div className='meeting-container'>
            { loading ? <div className='center'>Loading...</div>: <MeetingSummary data={data}/> }
            <Form loading={loading}/>
        </div>        
    )
}

export default MeetingView
