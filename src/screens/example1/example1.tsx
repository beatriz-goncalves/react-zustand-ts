import React, { useEffect } from "react";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../store/store";
import { User } from "./models/user";
import { Button } from "react-bootstrap";

export const Example1Screen: React.FC = () => {
  const userInitialState: User = {
    id: 0,
    name: "",
  };
  const [user, setUser] = useState<User>(userInitialState);

  const useStoreData = useStore((state) => ({
    users: state.users,
    handleDeleteUser: state.deleteUser,
    handleAddUser: state.addUser,
    setFlowData: state.setFlowData,
  }));

  useEffect(() => {
    useStoreData.setFlowData({ currentPage: "initialPage" });
  }, []);

  const handleChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const addUserHandler = async () => {
    useStoreData.handleAddUser(user);
    setUser(userInitialState);
  };

  const deleteUserHandler = (user: User) => {
    useStoreData.handleDeleteUser(user.id);
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
          {useStoreData.users?.map((user) => (
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
