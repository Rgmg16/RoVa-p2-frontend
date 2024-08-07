import React from 'react'
import RoVabannergif from './RoVa banner gif.gif'
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import Jobapplication from './Job application.png'
import Translation from './Translation-2.png'
import PublicRelations from './pr.jpg'

function Home() {
    return (
        <div>
            <img src={RoVabannergif} alt="RoVa banner GIF" className=" w-full h-auto" />
            <Container className="my-4">
                <h1 className="text-center"><i>~ What is RoVa? ~</i></h1>
                <p className="text-center">
                    RoVa is a vibrant platform where the deaf community unites to support and uplift each other. Here, members can share their experiences, discuss challenges, and provide solutions, all while staying informed about the latest trends and opportunities. It’s a space for celebrating achievements, tackling struggles collaboratively, and fostering a strong sense of community and empowerment.
                </p>
                <h2 className="text-center"><i>~ Mission ~</i></h2>
                <p className="text-center">
                    To support, defend, fight and plead on behalf of the deaf amongst us.
                </p>
                <h2 className="text-center"><i>~ Vision ~</i></h2>
                <p className="text-center">
                    Equality and justice to the deaf culture and community.
                </p>
                <h2 className="text-center"><i>~ Services offered by volunteers ~</i></h2>
                <p className="text-center">
                    Below are sample services that can be provided by volunteers. Feel free to suggest some more.
                </p>

                <div className="d-flex justify-content-center align-items-center h-100">
                    <Row className="gx-4">
                        <Col md={4} className="d-flex justify-content-center">
                            <Card className="mb-4" style={{ width: '18rem', height: '26rem', backgroundColor: 'green', color: 'cyan', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
                                <Card.Img variant="top" src={Jobapplication} />
                                <Card.Body>
                                    <Card.Title style={{ color: 'white' }}><i> ~ Job application ~</i></Card.Title>
                                    <Card.Text style={{ color: 'white' }}>
                                        Some enlisted volunteers can help you apply for a job in the event you are having difficulties in applying for a particular job or even help you get job opportunities.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="d-flex justify-content-center">
                            <Card className="mb-4" style={{ width: '18rem', height: '26rem', backgroundColor: 'green', color: 'cyan', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
                                <Card.Img variant="top" src={Translation} className="img-fluid" />
                                <Card.Body>
                                    <Card.Title style={{ color: 'white' }}><i>~ Translation ~</i></Card.Title>
                                    <Card.Text style={{ color: 'white' }}>
                                        The volunteers can offer translation services for whatever needs you may have, be it text/speech-to-sign or vice-versa. You can trust their expertise, since they are certified KSL learners that have completed level 3.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="d-flex justify-content-center">
                            <Card className="mb-4" style={{ width: '18rem', height: '26rem', backgroundColor: 'green', color: 'cyan', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
                                <Card.Img variant="top" src={PublicRelations} />
                                <Card.Body>
                                    <Card.Title style={{ color: 'white' }}><i>~ Public relations ~</i></Card.Title>
                                    <Card.Text style={{ color: 'white' }}>
                                        Some enlisted volunteers can help you improve your skills in communicating and interacting with others in the community.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>

            <p className='text-2xl text-opacity-25 mt-4' style={{ color: 'cyan' }}><i>~A voice for the voiceless~</i></p>

        </div>
    )
}

export default Home