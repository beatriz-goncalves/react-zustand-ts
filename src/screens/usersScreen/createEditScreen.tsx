import { ChangeEvent, useCallback, useEffect, useState } from "react";
import NavbarComponent from "../../components/navbar/navbar";
import { useStore } from "../../store/store";
import { useFlow } from "react-flow-app";
import { flowManager } from "../../flows";
import { Button, Col, Container, Row } from "react-bootstrap";
import { InputComponent } from "../../components/inputs/inputs";
import "../usersScreen/createEditScreen.css";
import { User } from "./models/user";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
    userEdit: state.userEdit,
    setUserEdit: state.setUserEdit,
    editUser: state.editUser,
  }));

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: useStoreData.userEdit || userInitialState,
  });

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
    useStoreData.setUserEdit();
    toast.success(`User ${userFormData.name} was created!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }, [userFormData]);

  const onHandleEditUser = useCallback(() => {
    dispatch("edit");
    useStoreData.editUser(userFormData);
    useStoreData.setUserEdit();
    toast.success(`User ${userFormData.name} was edited!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }, [userFormData]);

  const submitForm = useCallback(() => {
    if (useStoreData.userEdit) {
      onHandleEditUser();
    } else {
      onHandleCreateUserAction();
    }
  }, [dispatch, userFormData]);

  const onHandleGoBackAction = useCallback(() => {
    dispatch("goBack");
    useStoreData.setUserEdit();
  }, [dispatch]);

  useEffect(() => {
    useStoreData.setFlowData({ currentPage: "createEditUser" });
  }, []);

  useEffect(() => {
    if (useStoreData.userEdit) {
      setUserFormData(useStoreData.userEdit);
      setValue("street", useStoreData.userEdit.address.street);
      setValue("suite", useStoreData.userEdit.address.suite);
      setValue("city", useStoreData.userEdit.address.city);
      setValue("zipcode", useStoreData.userEdit.address.zipcode);
    } else {
      setUserFormData(userInitialState);
    }
  }, [useStoreData.userEdit, setValue]);

  return (
    <div>
      <NavbarComponent dispatch={dispatch} />
      <div className="auth-form-container-create-edit">
        <form
          className="auth-form-create-edit"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="auth-form-content-create-edit">
            <h3 className="auth-form-title-create-edit">
              {useStoreData.userEdit ? "Edit User" : "Create User"}
            </h3>
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
                    {useStoreData.userEdit ? "Edit" : "Submit"}
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
