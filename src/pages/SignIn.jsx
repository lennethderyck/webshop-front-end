import "../css/signin.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signin, register } from "../context/userActions";
import { useForm, FormProvider } from "react-hook-form";
import { useCallback, useState, useEffect } from "react";
import LabelInput from "../components/form/LabelInput";

const validationRuleRequired = { required: "This field is required!" };

export default function SignIn(props) {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { error, userInfo, loading } = userSignin;
  const history = useHistory();

  const [login, setLogin] = useState(false);

  //Triggers when a user is signed in and makes sure the user can't return to this page
  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      history.replace("/");
    }
  }, [history, userInfo]);

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  //Changes the view of the container
  // -> only for styling reasons
  const handleSignUp = () => {
    const container = document.getElementById("container");
    container.classList.add("right-panel-active");

    console.log(login);
    if (!login) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  //Changes the view of the container
  // -> only for styling reasons
  const handleSignIn = () => {
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active");

    console.log(login);
    if (!login) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };
  //Changes the view when the sign up button is clicked at a small width screen
  const handleSignUpSmall = () => {
    const signIn = document.getElementById("sign-in-container");
    const signUp = document.getElementById("sign-up-container");
    signIn.style.display = "none";
    signUp.style.display = "block";
    setLogin(true);
  };
  //Changes the view when the sign in button is clicked at a small width screen
  const handleSignInSmall = () => {
    const signIn = document.getElementById("sign-in-container");
    const signUp = document.getElementById("sign-up-container");
    signIn.style.display = "block";
    signUp.style.display = "none";
    setLogin(false);
  };

  //This function is called when the Sign In button is clicked
  const onSubmitLogin = useCallback(
    async (data) => {
      try {
        console.log(data);
        dispatch(signin(data.email, data.password));
        reset();
      } catch (error) {
        console.error(error);
      }
    },
    [reset, dispatch]
  );

  //This function is called when the Sign Up button is clicked
  const onSubmitRegister = useCallback(
    async (data) => {
      try {
        dispatch(register(data.name, data.email, data.password));
        reset();
      } catch (error) {
        console.error(error);
      }
    },
    [reset, dispatch]
  );

  //Shows a sign in and a sign up form
  return (
    <>
      <div className="overall">
        <div className="container-signUp" id="container">
          <div
            className="form-container sign-up-container"
            id="sign-up-container"
          >
            {login && (
              <>
                <FormProvider {...methods}>
                  <form
                    className="signIn-form"
                    onSubmit={handleSubmit(onSubmitRegister)}
                  >
                    <h1 className="h1-signIn mb-3">Create Account</h1>
                    <LabelInput
                      className="form-signIn-input"
                      label="name"
                      type="text"
                      defaultValue=""
                      validation={validationRuleRequired}
                    />
                    <LabelInput
                      className="form-signIn-input"
                      label="email"
                      type="email"
                      defaultValue=""
                      validation={validationRuleRequired}
                    />
                    <LabelInput
                      className="form-signIn-input"
                      label="password"
                      type="password"
                      defaultValue=""
                      validation={validationRuleRequired}
                    />
                    {error && <div className="form-error">{error}</div>}
                    <button type="submit" className="signUp-btn">
                      Sign Up
                    </button>
                    <p className="registerHere" onClick={handleSignInSmall}>
                      Already have an account?
                    </p>
                  </form>
                </FormProvider>
              </>
            )}
          </div>
          <div
            className="form-container sign-in-container"
            id="sign-in-container"
          >
            {!login && (
              <>
                <FormProvider {...methods}>
                  <form
                    className="signIn-form"
                    onSubmit={handleSubmit(onSubmitLogin)}
                  >
                    <h1 className="h1-signIn mb-3">Sign in</h1>
                    <LabelInput
                      className="form-signIn-input"
                      label="email"
                      type="email"
                      defaultValue=""
                      validation={validationRuleRequired}
                      data-cy="email_input"
                    />
                    <LabelInput
                      className="form-signIn-input"
                      label="password"
                      type="password"
                      defaultValue=""
                      validation={validationRuleRequired}
                      data-cy="password_input"
                    />
                    {error && <div className="form-error">{error}</div>}
                    <p>Forgot your password?</p>
                    <button
                      data-cy="login_btn"
                      type="submit"
                      className="signUp-btn"
                      disabled={loading}
                    >
                      Sign In
                    </button>
                    <p className="registerHere" onClick={handleSignUpSmall}>
                      Register here!
                    </p>
                  </form>
                </FormProvider>
              </>
            )}
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="h1-signIn">Welcome Back!</h1>
                <p className="p-signIn">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="signUp-btn ghost"
                  id="signIn"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="h1-signIn">Hello, Friend!</h1>
                <p className="p-signIn">
                  Enter your personal details and start journey with us
                </p>
                <button
                  className="signUp-btn ghost"
                  id="signUp"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
