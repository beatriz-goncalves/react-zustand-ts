import { Button } from "react-bootstrap";
import { useStore } from "../../store/store";
import "../loginSignup/loginSignup.css";
import { useFlow } from "react-flow-app";
import { flowManager } from "../../flows";
import { ChangeEvent, useCallback, useState } from "react";
import { UserAuthentication } from "./models/user";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const LoginSignupComponent: React.FC = () => {
  const userInitialState: UserAuthentication = {
    id: 0,
    name: "",
    email: "",
    password: "",
    isLogged: false,
  };
  const { dispatch } = useFlow(flowManager.screens.authentication);
  const hasLogin = useStore((state) => state.hasLogin);
  const hasLoginAction = useStore((store) => store.hasLoginAction);
  const usersWithAuthentication = useStore(
    (store) => store.usersWithAuthentication
  );
  const login = useStore((store) => store.login);
  const signup = useStore((store) => store.signup);
  const [userData, setFormUserData] =
    useState<UserAuthentication>(userInitialState);
  const [credentialsError, setCredentialsError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onHandleSignup = useCallback(() => {
    dispatch("signup");
    hasLoginAction(false);
    setFormUserData(userInitialState);
    setCredentialsError(false);
  }, [dispatch, hasLogin]);

  const onHandleGoBackAction = useCallback(() => {
    dispatch("goBack");
    hasLoginAction(true);
    setFormUserData(userInitialState);
    setCredentialsError(false);
  }, [dispatch, hasLogin]);

  const submitForm = useCallback(() => {
    hasLogin ? onHandleLoginAction() : onHandleSignupAction();
  }, [dispatch, usersWithAuthentication, userData, hasLogin]);

  const onHandleLoginAction = useCallback(() => {
    const userLogin = usersWithAuthentication.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );

    if (userLogin) {
      dispatch("login");
      login(userLogin);
    } else {
      setCredentialsError(true);
    }
  }, [userData]);

  const onHandleSignupAction = useCallback(() => {
    const userSignup = usersWithAuthentication.find(
      (user) => user.email === userData.email
    );
    if (userSignup) {
      setCredentialsError(true);
    } else {
      dispatch("signup");
      signup(userData);
      hasLoginAction(true);
      setFormUserData(userInitialState);
      setCredentialsError(false);
    }
  }, [userData]);

  const onHandleChangeUserData = (e: ChangeEvent<HTMLInputElement>) => {
    setFormUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleChangePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <div className="auth-form-container">
      <form className="auth-form">
        <div className="auth-form-content">
          <h3 className="auth-form-title">{hasLogin ? "Login" : "Signup"}</h3>
          {!hasLogin && (
            <div className="form-group mt-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter name"
                value={userData?.name}
                onChange={onHandleChangeUserData}
                name="name"
                id="name"
              />
            </div>
          )}
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={userData?.email}
              onChange={onHandleChangeUserData}
              name="email"
              id="email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control mt-1"
              placeholder="Enter password"
              value={userData?.password}
              onChange={onHandleChangeUserData}
              name="password"
              id="password"
            />
            <span
              className="iconPassword"
              onClick={onHandleChangePasswordVisibility}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          <div className="d-grid gap-2 mt-3">
            {hasLogin ? (
              <div>
                <h6>
                  {credentialsError
                    ? "O utilizador digitou inseriu credenciais erradas ou não está registado!"
                    : ""}
                </h6>
              </div>
            ) : (
              <div>
                <h6>{credentialsError ? "Email já registado!" : ""}</h6>
              </div>
            )}
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button variant="info" onClick={submitForm}>
              {hasLogin ? "Login" : "Signup"}
            </Button>
          </div>
          <p className="text-center mt-2">
            {hasLogin ? (
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
