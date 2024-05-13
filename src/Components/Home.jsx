import React from 'react'
import RoVabannergif from './RoVa banner gif.gif'
import Card from 'react-bootstrap/Card';
import Jobapplication from './Job application.png'
import Translation from './Translation.png'
function Home() {
  return (
    <div>

      <img src={RoVabannergif} alt="RoVa banner GIF" className=" w-full h-auto" />
      <h1><u>What is RoVa?</u></h1>
      <p>RoVa is a world where the deaf community comes together to support one another by viewing and discussing each other's complaints , providing solutions and giving updates on the current trends in the deaf community .
        Here in RoVa , the deaf culture can also access free sign language interpreters
        for their various needs .</p>
      <h2><u>Mission</u></h2>
      <p>To support, defend ,fight and plead on behalf of the deaf amongst us.</p>
      <h2><u>Vision</u></h2>
      <p>Equality and justice to the deaf culture and community.</p>
      <h2><u>Services offered by volunteers</u></h2>
      <p>Below are sample services that can be provided by volunteers. Feel free to suggest some more</p>

      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="row gx-4">
          <div className="col">
            <Card className="mx-auto mb-4" style={{ width: '18rem', height: '25rem', backgroundColor: 'cyan', color: 'green', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
              <Card.Img variant="top" src={Jobapplication} />
              <Card.Body>
                <Card.Title><u>Job application</u></Card.Title>
                <Card.Text>
                  Some enlisted volunteers can help you apply for a job in the event you are having difficulties in applying for a particular job or even help you get job opportunities.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card className="mx-auto" style={{ width: '18rem', height: '34rem', backgroundColor: 'cyan', color: 'green', boxShadow: '15px 15px 8px rgba(0, 0, 0, 0.3)' }}>
              <Card.Img variant="top" src={Translation} className="img-fluid" />
              <Card.Body>
                <Card.Title><u>Translation</u></Card.Title>
                <Card.Text>
                  The volunteers can offer translation services for whatever needs you may have, be it text/speech-to-sign or vice-versa. You can trust their expertise, since they are certified KSL learners that have completed level 3.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>



      <p className='text-2xl text-opacity-25 mt-4' style={{ color: 'cyan' }}><i>~A voice for the voiceless~</i></p>

    </div>
  )
}

export default Home