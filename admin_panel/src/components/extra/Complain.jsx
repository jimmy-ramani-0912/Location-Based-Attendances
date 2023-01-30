
import { TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'


export default function Complain() {
    const [complains,setComplaints] = useState([{
        "id":"1",
        "user": "bhavy",
        "complain": "I am not able to select location very accurately",
        "solved": "false"
    }, {
        "id":"2",
        "user": "mufid",
        "complain": "My ride was late",
        "solved": "false"
    }, {
        "id":"3",
        "user": "utsav",
        "complain": "my application is crashing frequently",
        "solved": "false"
    }])

    function discardComplain(id){
        console.log(id);
        let comp = complains.filter(cmp=>cmp.id!==id)
        console.log(comp);
        setComplaints(comp);
    }
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Container className='my-5'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Complain</th>
                                <th>remark</th>
                                <th>Send</th>
                                <th>Discard</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complains.map((comp) => {
                                return (
                                    <tr>
                                        <td>{comp.user}</td>
                                        <td>{comp.complain}</td>
                                        <td><TextField></TextField></td>
                                        <td>
                                            <Button variant="info" onClick={()=>{discardComplain(comp.id)}}>Send</Button>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={()=>{discardComplain(comp.id)}}>Discard</Button>
                                        </td>
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
