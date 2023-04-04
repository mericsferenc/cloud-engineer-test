import React from 'react'
import CarsTable from './Table'
import ValidateUser from './ValidateUser'

const Cars = () => {
    return (
        <>
            <h1>Cars CRUD API</h1>
            <ValidateUser />
            <CarsTable />
        </>
    )
}

export default Cars