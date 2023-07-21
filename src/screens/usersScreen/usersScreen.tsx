import { Table } from "react-bootstrap";
import { User } from "./models/user";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users";
import { useStore } from "../../store/store";
import TableComponent from "../../components/tableComponent/table";

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
      <TableComponent
        theadInformation={tableThead}
        tbdodyInformation={useStoreData.users}
      />
    </div>
  );
};

export default UsersScreen;
