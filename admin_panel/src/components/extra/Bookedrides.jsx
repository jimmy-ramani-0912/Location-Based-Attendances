import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

export default function Bookedrides() {
    const [bookedrides, setBookedRides] = useState([]);
    useEffect(() => {
        // axios.get('/api/bookedride/getallbooked').then((res)=>{
        //     setBookedRides(res.data.data)
        //     console.log(bookedrides)
        // })
    }, [])
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Container className='my-5'>
                    <Table>
                        <thead>
                            <tr>
                                <th>Username of Car Owner</th>
                                <th>Mobile No. of Car owner</th>
                                <th>Username of Rider</th>
                                <th>Mobile No. of Rider</th>
                                <th>Leaving Location</th>
                                <th>Destination</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                bookedrides.map((rides)=>{
                                    return(
                                    <tr>
                                        <td>Dr. Trushit Upadhyay</td>
                                        <td>9016354957</td>
                                        <td>{rides.nameOfRider}</td>
                                        <td>{rides.MobileNoOfRider}</td>
                                        <td>{rides.LeavingLocation}</td>
                                        <td>{rides.DestinationLocation}</td>
                                        <td>{rides.Date}</td>
                                        
                                    </tr>
                                    )
                                })
                            } */}
                            <tr>
                                <td>Dr. Trushit Upadhyay</td>
                                <td>9016354957</td>
                                <td>Bhavy</td>
                                <td>1234567890</td>
                                <td>Ahmedabad</td>
                                <td>Gandhinagar</td>
                                <td>08/10/2022</td>
                            </tr>
                            <tr>
                                <td>Dr. Trushit Upadhyay</td>
                                <td>9016354957</td>
                                <td>utsav</td>
                                <td>1478523698</td>
                                <td>Ahmedabad</td>
                                <td>Gandhinagar</td>
                                <td>08/10/2022</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </div>
        </div>
    )
}
