import {Container, Row, Col, Button,Card} from "react-bootstrap";
import { useState } from "react";
import RegisterForm from "./../components/Register"


export default function Home(){

    const [showRegister, setShowRegister] = useState(false);

    return (
        <Container id="homeCont" className="px-3 py-5 m-3 mb-5 rounded">
            <div id="homeimg" className="px-2 py-5 m-3">
                <Row>
                    <Col md={7} >
                        <div id="homebg"></div>
                    </Col>
                    <Col className="m-5">
                        <h1 className="text-dark text-start my-5"><strong>Quality sounds doesn't need to be expensive</strong></h1>
                        <Button id="cardbtn"
                        onClick={() => setShowRegister(true)} 
                        className="m-3">
                        Register Now</Button>
                    </Col>
                </Row>
            </div>
            <RegisterForm
            show = {showRegister}
            onHide={() => setShowRegister(false)}/>
            <Row className="mt-5 mx-2">
                <Col>
                    <div id="card1" className="d-flex align-items-center justify-content-center">
                        <a className="selectbtn btn btn-transparent text-light">Headphones</a>
                    </div>
                </Col>
                <Col>
                    <div id="card2" className="d-flex align-items-center justify-content-center">
                        <a className="selectbtn btn btn-transparent text-light">IEM</a>
                     </div>
                </Col>
                <Col>
                    <div id="card3" className="d-flex align-items-center justify-content-center">
                        <a className="selectbtn btn btn-transparent text-light">HiFi Audio Player</a>
                    </div>
                </Col>
                <Col>
                    <div id="card4" className="d-flex align-items-center justify-content-center">
                        <a className="selectbtn btn btn-transparent text-light">Wireless Earphones</a>
                    </div>
                </Col>
            </Row>
        </Container>

    )
}