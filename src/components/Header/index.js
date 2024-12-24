import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {IoCartOutline} from 'react-icons/io5'
import './index.css'

const Header = props => {
  const {restaurantname, cartCount} = props

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="#home">
          <h1>{restaurantname}</h1>
        </Navbar.Brand>
        <Nav className="">
          <Nav.Link href="#">
            <p>My Orders</p>
          </Nav.Link>
          <Nav.Link href="/cart">
            <IoCartOutline size={25} color="#737475" />
            <span className="count">{cartCount}</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
export default Header
