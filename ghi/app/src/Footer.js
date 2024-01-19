import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Footer() {
    return (
        <Navbar variant="light" bg="light" fixed="bottom">
            <Container>
            <Navbar.Collapse>
                    <Navbar.Text>
                        <p>Servicing makes the Car a fresh model.</p>
                    </Navbar.Text>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <p>Ultra Automobile  |   Inc in 2022 </p>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
