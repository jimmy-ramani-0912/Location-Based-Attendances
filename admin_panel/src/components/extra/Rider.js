import axios from 'axios';
import React from 'react'
import { Container, Table } from 'react-bootstrap'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Rider() {
    const [rider, setRider] = useState([]);

    // useEffect(() => {
    //     axios.get('/api/rides/getallrides').then((res) => {
    //         setRider(res.data.data.Ride)
    //         console.log(res.data)
    //     })
    // }, [])
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Container className='my-5'>
                    <Table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Name of Rider</th>
                                <th>Mobile No.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rider.map((owner) => {
                                return(
                                <tr>
                                    <td>{owner.Ridername}</td>
                                    <td>{owner.RiderMobileNo}</td>
                                    <td>Yes</td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Container>
            </div>
        </div>
    )
}
