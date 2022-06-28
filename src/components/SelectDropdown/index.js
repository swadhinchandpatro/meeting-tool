import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { FETCH_BUILDINGS } from '../../GraphQL/Queries'

const SelectDropdown = (props) => {
    const { loading, data, error } = useQuery(FETCH_BUILDINGS)
    const [buildings, setBuildings] = useState([]);
    console.log('rerender')
    useEffect(() => {
        if(data && !error) {
            console.log(data)
            const { Buildings } = data
            setBuildings(Buildings.map(obj => obj.name))
        }
    }, [data])
    return (
        <select name={props.name}>
            {loading ? <option>Loading</option> : buildings.map(buildingNo => <option value={buildingNo}>{buildingNo}</option>)}
        </select>
    )
}

export default SelectDropdown
