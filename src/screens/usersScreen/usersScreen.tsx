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
import { User } from "./models/user";
import { toast } from "react-toastify";

const UsersScreen: React.FC = () => {
  const useStoreData = useStore((state) => ({
    users: state.users,
    setUsers: state.setUsers,
    deleteUser: state.deleteUser,
    setUserEdit: state.setUserEdit,
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
    useStoreData.setUserEdit();
  }, [dispatch]);

  const onHandleDelete = useCallback((user: User) => {
    useStoreData.deleteUser(user.id);
    toast.success(`User ${user.name} was deleted!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }, []);

  const onHandleEdit = useCallback((user: User) => {
    dispatch("edit");
    useStoreData.setUserEdit(user);
  }, []);

  return (
    <div>
      {showLoading ? (
        <SpinnerComponent />
      ) : useStoreData.users.length > 0 ? (
        <div>
          <TableComponent
            theadInformation={tableThead}
            tbdodyInformation={useStoreData.users}
            onHandleDelete={onHandleDelete}
            onHandleEdit={onHandleEdit}
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
