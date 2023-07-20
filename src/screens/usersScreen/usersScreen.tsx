import { Table } from "react-bootstrap";
import { User } from "./models/user";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users";
import { useStore } from "../../store/store";

const UsersScreen: React.FC = () => {
  const setUser = useStore((state) => state.setUser);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (users.length !== 0) {
      setUsers(users);
    } else {
      getAllUsers().then((users) => {
        setUsers(users);
        setUser(users);
      });
    }
  }, []);

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
        {users &&
          users.map((user, index) => (
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
