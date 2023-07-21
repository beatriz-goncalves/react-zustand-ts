import { ChangeEvent, useCallback, useEffect, useState } from "react";
import NavbarComponent from "../../components/navbar/navbar";
import { useStore } from "../../store/store";
import { useFlow } from "react-flow-app";
import { flowManager } from "../../flows";
import { Button, Col, Container, Row } from "react-bootstrap";
import { InputComponent } from "../../components/inputs/inputs";
import "../usersScreen/createEditScreen.css";
import { User } from "./models/user";
import { useForm } from "react-hook-form";

const CreateEditUserScreen: React.FC = () => {
  const { dispatch } = useFlow(flowManager.screens.createEditUser);

  const userInitialState: User = {
    id: 0,
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      city: "",
      street: "",
      suite: "",
      zipcode: "",
    },
  };

  const [userFormData, setUserFormData] = useState<User>(userInitialState);

  const useStoreData = useStore((state) => ({
    setFlowData: state.setFlowData,
    addUser: state.addUser,
  }));

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onHandleUserData = (e: ChangeEvent<HTMLInputElement>) => {
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
      address: {
        ...userFormData.address,
        [e.target.name]: e.target.value,
      },
    });
  };

  const onHandleCreateUserAction = useCallback(() => {
    useStoreData.addUser(userFormData);
    dispatch("create");
    setUserFormData(userInitialState);
  }, [userFormData]);

  const submitForm = useCallback(() => {
    onHandleCreateUserAction();
  }, [dispatch, userFormData, userFormData]);

  const onHandleGoBackAction = useCallback(() => {
    dispatch("goBack");
  }, [dispatch]);

  useEffect(() => {
    useStoreData.setFlowData({ currentPage: "createEditUser" });
  }, []);

  return (
    <div>
      <NavbarComponent dispatch={dispatch} />
      <div className="auth-form-container-create-edit">
        <form
          className="auth-form-create-edit"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="auth-form-content-create-edit">
            <h3 className="auth-form-title-create-edit">Create User</h3>
            <Container>
              <Row className="row-cols-3">
                <Col>
                  <InputComponent
                    label="Name"
                    id="name"
                    name="name"
                    placeholder="Name"
                    type="text"
                    register={register}
                    errors={errors.name}
                    onChange={onHandleUserData}
                  />
                </Col>
                <Col>
                  <InputComponent
                    label="Username"
                    id="username"
                    name="username"
                    placeholder="Username"
                    type="text"
                    register={register}
                    errors={errors.name}
                    onChange={onHandleUserData}
                  />
                </Col>
                <Col>
                  <InputComponent
                    label="Email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    register={register}
                    errors={errors.name}
                    onChange={onHandleUserData}
                  />
                </Col>
                <Col>
                  <InputComponent
                    label="Phone"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    type="text"
                    register={register}
                    errors={errors.name}
                    onChange={onHandleUserData}
                  />
                </Col>

                <Col>
                  <InputComponent
                    label="Website"
                    id="website"
                    name="website"
                    placeholder="Website"
                    type="text"
                    register={register}
                    errors={errors.name}
                    onChange={onHandleUserData}
                  />
                </Col>
                <Col>
                  <InputComponent
                    label="Street"
                    id="street"
                    name="street"
                    placeholder="Street"
                    type="text"
                    register={register}
                    errors={errors.name}
                    onChange={onHandleUserData}
                  />
                </Col>
                <Col>
                  <InputComponent
                    label="Suite"
                    id="suite"
                    name="suite"
                    placeholder="Suite"
                    type="text"
                    register={register}
                    errors={errors.name}
                    onChange={onHandleUserData}
                  />
                </Col>
                <Col>
                  <InputComponent
                    label="City"
                    id="city"
                    name="city"
                    placeholder="City"
                    type="text"
                    register={register}
                    errors={errors.name}
                    onChange={onHandleUserData}
                  />
                </Col>
                <Col>
                  <InputComponent
                    label="Zip Code"
                    id="zipcode"
                    name="zipcode"
                    placeholder="Zip Code"
                    type="text"
                    register={register}
                    errors={errors.name}
                    onChange={onHandleUserData}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mt-3">
                  <Button
                    type="submit"
                    variant="info"
                    className="submit-button"
                  >
                    Submit
                  </Button>
                  <Button variant="outline-info" onClick={onHandleGoBackAction}>
                    Go Back
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditUserScreen;
