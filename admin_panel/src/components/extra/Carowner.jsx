import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

export default function Carowner() {
    const [carowner,setCarowner] = useState([]);

    useEffect(()=>{
        axios.get('/api/rides/getallrides').then((res)=>{
            setCarowner(res.data.data.Ride)
            console.log(res.data.ride)
        })
    },[])
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Container className='my-5'>
                    <Table>
                        <thead>
                            <tr>
                                {/* <th>Username</th> */}
                                <th>Name of Car Owner</th>
                                <th>Mobile No.</th>
                                <th>Verified or not</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carowner.map((owner)=>{
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
