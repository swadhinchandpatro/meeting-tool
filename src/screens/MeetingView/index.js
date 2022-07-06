import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import Form from '../../components/Form';
import MeetingSummary from '../../components/MeetingSummary';
import { FETCH_BUILDINGS } from '../../GraphQL/Queries';
import { storeBuildingData } from '../../actions';
import {  useTokenWithQuery } from '../../controllers/api';

import './styles.scss'
const MeetingView = () => {
    const createStatus = useSelector(store => store.createStatus);
    const { loading, data, error, refetch } = useTokenWithQuery(FETCH_BUILDINGS)
    
    const dispatch = useDispatch()

    useEffect(() => {
        if(data && !error) {
            dispatch(storeBuildingData(data))
        } else if(error){
            console.error(error)
        }
    }, [data, error])

    useEffect(() => {
        if(createStatus) {
            refetch()
        }
    }, [createStatus])

    // useEffect(() => {

    // })

    return (
        <div className='meeting-container'>
            { loading ? <div className='center'>Loading...</div>: error ? <div className='center'>Error</div> : <MeetingSummary data={data}/> }
            <Form loading={loading}/>
        </div>        
    )
}

export default MeetingView
