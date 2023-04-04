import React from 'react'
import CarForm from './Form'
import CarsTable from './Table'
import ValidateUser from './ValidateUser'

const Cars = () => {
    return (
        <>
            <h1>Cars CRUD API</h1>
            <ValidateUser />
            <CarForm />
            <CarsTable />
        </>
    )
}

export default Cars