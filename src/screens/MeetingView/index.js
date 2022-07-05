import React, { useEffect } from 'react'
import {  useDispatch } from 'react-redux';
import Form from '../../components/Form';
import MeetingSummary from '../../components/MeetingSummary';
import { FETCH_BUILDINGS } from '../../GraphQL/Queries';
import { storeBuildingData } from '../../actions';
import { useTokenWithQuery } from '../../controllers/api';

import './styles.scss'
const MeetingView = () => {
    const { loading, data, error } = useTokenWithQuery(FETCH_BUILDINGS)
    
    const dispatch = useDispatch()

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
