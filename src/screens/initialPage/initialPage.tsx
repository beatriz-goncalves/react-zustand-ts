import NavbarComponent from "../../components/navbar/navbar";

const InitialPageScreen: React.FC = () => {
  return (
    <div>
      <NavbarComponent userLogged="User 123" />
    </div>
  );
};

export default InitialPageScreen;
