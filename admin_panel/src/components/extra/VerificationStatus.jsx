import React from 'react'
import { Container, Table } from 'react-bootstrap'

export default function VerificationStatus() {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Container>
                    <Table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Document Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </Table>
                </Container>

            </div>
        </div>
    )
}
