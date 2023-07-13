import { Button, Container, Navbar } from "react-bootstrap";
import { useStore } from "../../store/store";
import { useCallback } from "react";
import { UserAuthentication } from "../../screens/loginSignup/models/user";

interface NavbarProps {
  dispatch: (action: any) => void;
}

const NavbarComponent: React.FC<NavbarProps> = ({ dispatch }) => {
  const userWithAutentication = useStore(
    (state) => state.usersWithAuthentication
  );
  const userLogout = userWithAutentication.find((user) => user.isLogged);

  const logout = useStore((state) => state.logout);

  const onHandleLogoutAction = useCallback(() => {
    logout(userLogout as UserAuthentication);
    dispatch("logout");
  }, [userWithAutentication]);

  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Welcome, {userLogout?.name}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button variant="info" onClick={onHandleLogoutAction}>
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
