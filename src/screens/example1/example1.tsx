import { ChangeEvent, useCallback, useState } from "react";
import { useStore } from "../../store/store";
import { User } from "./models/user";
import { Button } from "react-bootstrap";
import { useFlow } from "react-flow-app";
import { flowManager } from "../../flows/flowManager";

export const Example1Screen: React.FC = () => {
  const userInitialState: User = {
    id: 0,
    name: "",
  };
  const [user, setUser] = useState<User>(userInitialState);
  const users = useStore((state) => state.users);
  const handleDeleteUser = useStore((state) => state.deleteUser);
  const handleAddUser = useStore((state) => state.addUser);

  const handleChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const addUserHandler = async () => {
    handleAddUser(user);
    setUser(userInitialState);
  };

  const deleteUserHandler = (user: User) => {
    handleDeleteUser(user.id);
  };

  return (
    <div>
      <div
        style={{ justifyContent: "center", display: "flex", padding: "15px" }}
      >
        <input
          className="form-control"
          type="text"
          placeholder="Enter user name"
          onChange={handleChangeUserName}
          value={user.name}
          id="name"
          name="name"
        />
        <Button onClick={addUserHandler} variant="warning">
          Add User
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          borderTop: "1px solid black",
        }}
      >
        <ul style={{ textAlign: "center" }}>
          {users?.map((user) => (
            <li key={user.id}>
              {user.name}
              <Button
                style={{ marginLeft: "15px" }}
                onClick={() => {
                  deleteUserHandler(user);
                }}
                variant="danger"
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Example1Screen;
