import { Button, Container, Navbar } from "react-bootstrap";

interface NavbarProps {
  userLogged: string | undefined;
  logout: () => void;
}

const NavbarComponent: React.FC<NavbarProps> = ({ userLogged, logout }) => {
  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Welcome, {userLogged}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button variant="info" onClick={logout}>
                Logout
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
