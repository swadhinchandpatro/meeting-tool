import React, { useCallback, useState } from 'react'
import { FAILED, SUCCESS } from '../../constants';
import SelectDropdown from '../SelectDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { openRoomSelection } from '../../actions';

import './styles.scss'

const Form = (props) => {
    const createStatus = useSelector(store => store.createStatus);
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [building, setBuilding] = useState('');

    const dispatch = useDispatch()

    const openModal = () => {
        dispatch(openRoomSelection({date, startTime, endTime, building}))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        openModal()
    }

    return (
        <div className='add-meeting'>
            <form className='form' onSubmit={onSubmit}>
                { createStatus === SUCCESS && <div className='success'>Meeting Created Successfully</div> }
                { createStatus === FAILED && <div className='notification'>Meeting Creation Failed</div> }
                <label htmlFor="date">Date</label>
                <input name="date" type="date" value={date} onChange={e => setDate(e.target.value)} id="date" required pattern="\d{2}-\d{2}-\d{4}"/>
                <label htmlFor="start-time">Start Time</label>
                <input name="start-time" type="text" id="start-time" value={startTime} onChange={e => setStartTime(e.target.value)} required />
                <label htmlFor="end-time">End Time</label>
                <input name="end-time" type="text" id="end-time" value={endTime} onChange={e => setEndTime(e.target.value)} required />
                <label htmlFor="building">Building</label>
                <SelectDropdown name='building' loading={props.loading} value={building} setBuilding={setBuilding}/>
                <button type="submit" className='next-btn'>Next</button>
            </form>
        </div>
    )
}

export default Form
