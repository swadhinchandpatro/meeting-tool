
import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'

const SelectDropdown = (props) => {
    const buildings = useSelector(store => store.buildingData?.Buildings || [])

    useEffect(() => {
        if(buildings.length) {
            props.setBuilding(buildings[0].name)
        }
    }, [buildings])

    return (
        <select name={props.name} onChange={(e) => props.setBuilding(e.target.value)}>
            {props.loading ? <option>Loading</option> : buildings.map(buildingNo => {
                return props.value === buildingNo.name ? <option key={buildingNo.name} value={buildingNo.name} selected>{buildingNo.name}</option> :
                <option key={buildingNo.name} value={buildingNo.name}>{buildingNo.name}</option>
            })}
        </select>
    )
}

export default memo(SelectDropdown)
