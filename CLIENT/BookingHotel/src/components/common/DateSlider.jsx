import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'

const DateSlider = ({ onDateChange, onFilterChange }) => {
    const [dateRange, setDateRange] = useState({
        startDate: "",
        endDate: "",
        key: "selection"
    })

    const handleSelect = (ranges) => {
        const { startDate, endDate } = ranges.selection
        setDateRange(ranges.selection)
        onDateChange(startDate, endDate)
        onFilterChange(startDate, endDate)
    }

    const handleClearFilter = () => {
        const clearedRange = {
            startDate: "",
            endDate: "",
            key: "selection"
        }
        setDateRange(clearedRange)
        onDateChange(null, null)
        onFilterChange(null, null)
    }

    return (
        <>
            <h5>Filter bookings by date</h5>
            <DateRangePicker
                ranges={[dateRange]}
                onChange={handleSelect}
                className='mb-4'
            />
            <button className='btn btn-secondary' onClick={handleClearFilter}>
                Clear Filter
            </button>
        </>
    )
}

export default DateSlider
