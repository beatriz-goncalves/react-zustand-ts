import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useStore } from "../../store/store";
import "../loginSignup/loginSignup.css";
import { useFlow } from "react-flow-app";
import { flowManager } from "../../flows";
import { ChangeEvent, useCallback, useState } from "react";
import { UserAuthentication } from "./models/user";
import { InputComponent } from "../../components/inputs/inputs";
import { InputPasswordComponent } from "../../components/inputs/inputPassword";
import { ErrorComponent } from "../../components/errorComponent/error";
import { useForm } from "react-hook-form";

const LoginSignupComponent: React.FC = () => {
  const userInitialState: UserAuthentication = {
    id: 0,
    name: "",
    email: "",
    password: "",
    isLogged: false,
  };
  const { dispatch } = useFlow(flowManager.screens.authentication);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const useStoreData = useStore((state) => ({
    hasLogin: state.hasLogin,
    hasLoginAction: state.hasLoginAction,
    usersWithAuthentication: state.usersWithAuthentication,
    login: state.login,
    signup: state.signup,
    setFlowData: state.setFlowData,
  }));

  const [userData, setFormUserData] =
    useState<UserAuthentication>(userInitialState);
  const [credentialsError, setCredentialsError] = useState<boolean>(false);

  useEffect(() => {
    useStoreData.setFlowData({ currentPage: "authentication" });
  }, []);

  const onHandleSignup = useCallback(() => {
    dispatch("signup");
    useStoreData.hasLoginAction(false);
    setCredentialsError(false);
    reset(userInitialState);
  }, [dispatch, useStoreData.hasLogin]);

  const onHandleGoBackAction = useCallback(() => {
    dispatch("goBack");
    useStoreData.hasLoginAction(true);
    setCredentialsError(false);
    reset(userInitialState);
  }, [dispatch, useStoreData.hasLogin]);

  const submitForm = useCallback(() => {
    useStoreData.hasLogin ? onHandleLoginAction() : onHandleSignupAction();
  }, [
    dispatch,
    useStoreData.usersWithAuthentication,
    userData,
    useStoreData.hasLogin,
  ]);

  const onHandleLoginAction = useCallback(() => {
    const userLogin = useStoreData.usersWithAuthentication.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );

    if (userLogin) {
      dispatch("login");
      useStoreData.login(userLogin);
      reset(userInitialState);
    } else {
      setCredentialsError(true);
      reset(userInitialState);
    }
  }, [userData]);

  const onHandleSignupAction = useCallback(() => {
    const userSignup = useStoreData.usersWithAuthentication.find(
      (user) => user.email === userData.email
    );
    if (userSignup) {
      setCredentialsError(true);
    } else {
      dispatch("signup");
      useStoreData.signup(userData);
      useStoreData.hasLoginAction(true);
      setCredentialsError(false);
      reset(userInitialState);
    }
  }, [userData]);

  const onHandleChangeUserData = (e: ChangeEvent<HTMLInputElement>) => {
    setFormUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit(submitForm)}>
        <div className="auth-form-content">
          <h3 className="auth-form-title">
            {useStoreData.hasLogin ? "Login" : "Signup"}
          </h3>
          {!useStoreData.hasLogin && (
            <div className="form-group mt-3">
              <InputComponent
                label="Name"
                id="name"
                name="name"
                placeholder="Enter name"
                type="text"
                register={register}
                errors={errors.name}
                onChange={onHandleChangeUserData}
              />
            </div>
          )}
          <div className="form-group mt-3">
            <InputComponent
              id="email"
              label="Email Address"
              name="email"
              placeholder="Enter email"
              type="email"
              register={register}
              errors={errors.email}
              onChange={onHandleChangeUserData}
            />
          </div>
          <div className="form-group mt-3">
            <InputPasswordComponent
              id="password"
              label="Password"
              name="password"
              placeholder="Enter password"
              register={register}
              errors={errors.password}
              onChange={onHandleChangeUserData}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            {useStoreData.hasLogin ? (
              <div>
                <h6>
                  {credentialsError && (
                    <ErrorComponent informationText="O utilizador inseriu credenciais erradas ou não está registado!" />
                  )}
                </h6>
              </div>
            ) : (
              <div>
                <h6>
                  {credentialsError && (
                    <ErrorComponent informationText="Email já registado!" />
                  )}
                </h6>
              </div>
            )}
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button variant="info" type="submit">
              {useStoreData.hasLogin ? "Login" : "Signup"}
            </Button>
          </div>
          <p className="text-center mt-2">
            {useStoreData.hasLogin ? (
              <a className="actionLink" onClick={onHandleSignup}>
                Don't have an account yet? Please create one!
              </a>
            ) : (
              <a className="actionLink" onClick={onHandleGoBackAction}>
                Go Back
              </a>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginSignupComponent;
