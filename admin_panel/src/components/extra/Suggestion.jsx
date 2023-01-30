import React from 'react'
import { useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

export default function Suggestion() {
    const [suggestion,setSuggestion] = useState([{
        "id":"1",
        "user": "bhavy",
        "suggestion": "I found this app very good. It helped me for car sharing. very good experience"
    }, {
        "id":"2",
        "user": "mufid",
        "suggestion": "Easy to use app. Imidiately found a vehicle for a ride"
    }, {
        "id":"3",
        "user": "utsav",
        "suggestion": "my application is crashing frequently"
    }])

    
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
                                <th>Suggestion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suggestion.map((comp) => {
                                return (
                                    <tr>
                                        <td>{comp.user}</td>
                                        <td>{comp.suggestion}</td>
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
