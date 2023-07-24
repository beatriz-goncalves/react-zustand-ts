import { Button, Table } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { getAllUsers } from "../../services/users";
import { useStore } from "../../store/store";
import TableComponent from "../../components/tableComponent/table";
import { ErrorComponent } from "../../components/errorComponent/error";
import "../usersScreen/usersScreen.css";
import { useFlow } from "react-flow-app";
import { flowManager } from "../../flows";
import SpinnerComponent from "../../components/spinner/spinner";

const UsersScreen: React.FC = () => {
  const useStoreData = useStore((state) => ({
    users: state.users,
    setUsers: state.setUsers,
  }));
  const { dispatch } = useFlow(flowManager.screens.users);
  const [showLoading, setShowLoading] = useState<boolean>(true);

  const tableThead = [
    "#",
    "Name",
    "Username",
    "Email",
    "Phone",
    "Website",
    "Address",
    "Actions",
  ];

  useEffect(() => {
    useStoreData.users.length === 0
      ? getAllUsers()
          .then((users) => {
            useStoreData.setUsers(users);
            setShowLoading(false);
          })
          .catch((error) => {
            console.error("Error: ", error);
            setShowLoading(false);
          })
      : setShowLoading(false);
  }, [useStoreData.users]);

  const onHandleCreateUser = useCallback(() => {
    dispatch("create");
  }, [dispatch]);

  return (
    <div>
      {showLoading ? (
        <SpinnerComponent />
      ) : useStoreData.users.length > 0 ? (
        <div>
          <TableComponent
            theadInformation={tableThead}
            tbdodyInformation={useStoreData.users}
          />
          <div className="add-button">
            <Button variant="info" onClick={onHandleCreateUser}>
              Create User
            </Button>
          </div>
        </div>
      ) : (
        <div className="error-component">
          <ErrorComponent informationText="Users not found!" />
        </div>
      )}
    </div>
  );
};

export default UsersScreen;
