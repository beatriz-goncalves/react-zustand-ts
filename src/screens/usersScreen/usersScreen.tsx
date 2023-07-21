import { Table } from "react-bootstrap";
import { User } from "./models/user";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users";
import { useStore } from "../../store/store";

const UsersScreen: React.FC = () => {
  const useStoreData = useStore((state) => ({
    users: state.users,
    setUsers: state.setUsers,
  }));

  useEffect(() => {
    useStoreData.users.length === 0 &&
      getAllUsers()
        .then((users) => useStoreData.setUsers(users))
        .catch((error) => console.error("ERROR: ", error));
  }, [useStoreData.users]);

  return (
    <Table responsive="xl">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {useStoreData.users &&
          useStoreData.users.map((user, index) => (
            <tr key={user.id} className="text-left">
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default UsersScreen;
