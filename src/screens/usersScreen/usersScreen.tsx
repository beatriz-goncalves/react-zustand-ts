import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users";
import { useStore } from "../../store/store";
import TableComponent from "../../components/tableComponent/table";
import { ErrorComponent } from "../../components/errorComponent/error";
import "../usersScreen/usersScreen.css";

const UsersScreen: React.FC = () => {
  const useStoreData = useStore((state) => ({
    users: state.users,
    setUsers: state.setUsers,
  }));

  const tableThead = [
    "#",
    "Name",
    "Username",
    "Email",
    "Phone",
    "Website",
    "Address",
  ];

  useEffect(() => {
    useStoreData.users.length === 0 &&
      getAllUsers()
        .then((users) => useStoreData.setUsers(users))
        .catch((error) => console.error("ERROR: ", error));
  }, [useStoreData.users]);

  return (
    <div>
      {useStoreData.users.length > 0 ? (
        <div>
          <TableComponent
            theadInformation={tableThead}
            tbdodyInformation={useStoreData.users}
          />
          <div className="add-button">
            <Button variant="info">Add User</Button>
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
