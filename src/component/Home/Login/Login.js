

import "./Login.css";
import React, { useContext, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import HeaderNavbar from "../HeaderNavbar/HeaderNavbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { Spinner } from "react-bootstrap";

initializeApp(firebaseConfig);

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [signingIn, setSigningIn] = useState(false);
    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: { errors },
    } = useForm();

    const password = useRef({});
    password.current = watch("password");

    const initialState = {
        signUpSuccess: "",
        signUpError: "",
        signInSuccess: "",
        signInError: "",
    };
    const [signedInError, setSignedInError] = useState(initialState);

    const history = useNavigate();

    useEffect(() => {
        document.title = "Login"
    }, []);

    //   handle email sign up
    const onSignUpDetailSubmit = (data) => {
        if (data.name && data.email && data.password) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    handleUpdateUserInfo(data.name);
                    const user = userCredential.user;
                    console.log(user);
                    setNewUser(false)
                    const newSignUpError = { ...signedInError };
                    newSignUpError.signUpSuccess = "Sign Up Successful";
                    newSignUpError.signUpError = "";
                    setSignedInError(newSignUpError);
                })
                .catch((error) => {
                    console.log(error.message, "sign up err");
                    const newSignUpError = { ...signedInError };
                    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                        newSignUpError.signUpError = "This email already in use";
                        newSignUpError.signUpSuccess = "";
                        setSignedInError(newSignUpError);
                    }
                    else {
                        newSignUpError.signUpError = "Signed up failed try again";
                        newSignUpError.signUpSuccess = "";
                        setSignedInError(newSignUpError);
                    }
                });
        }
    };

    // update user info
    const handleUpdateUserInfo = (name) => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "https://i.ibb.co/WKjYBgg/user-Avatar.png",
        })
            .then(() => {
                console.log("profile updated");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //   handle email sign in
    const onSignInDetailSubmit = (data) => {
        if (data.email && data.password) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setUserInfo(user);
                    const newSignInMessage = { ...signedInError };
                    newSignInMessage.signInSuccess = "Login Successful";
                    newSignInMessage.signInError = "";
                    setSignedInError(newSignInMessage);
                    handleGetIdToken();
                })
                .catch((error) => {
                    console.log(error.message, "sign in err");
                    const newSignInMessage = { ...signedInError };
                    newSignInMessage.signInSuccess = "";
                    newSignInMessage.signInError = "Invalid Email or Password try again";
                    setSignedInError(newSignInMessage);
                });
        }
    };

    // handle google sign in
    const handleGoogleSignIn = (e) => {
        setSigningIn(true);
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUserInfo(user);
                handleGetIdToken();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // handle facebook sign
    const handleFacebookSign = () => {
        const provider = new FacebookAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUserInfo(user);
                handleGetIdToken();
                console.log(user, "facebook sign up success");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // get user id token
    const handleGetIdToken = () => {
        getAuth().currentUser.getIdToken(true)
            .then(function (idToken) {
                localStorage.setItem("loggedInUserToken", idToken)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    // user info updating on state
    const setUserInfo = (user) => {
        if (user) {
            axios.get("https://digital-dudes.herokuapp.com/admins/" + user.email)
                .then(res => {
                    if (res.data.length) {
                        const newSignedInUser = { ...loggedInUser };
                        newSignedInUser.name = user.displayName;
                        newSignedInUser.email = user.email;
                        newSignedInUser.imgUrl = user.photoURL;
                        newSignedInUser.admin = true;
                        setLoggedInUser(newSignedInUser);
                        handleSetNewLoggedInUser(newSignedInUser);
                        if (newSignedInUser) {
                            history("/dashboard/subscription");
                            setSigningIn(false);
                        }
                    }
                    else {
                        const newSignedInUser = { ...loggedInUser };
                        newSignedInUser.name = user.displayName;
                        newSignedInUser.email = user.email;
                        newSignedInUser.imgUrl = user.photoURL;
                        newSignedInUser.admin = false;
                        setLoggedInUser(newSignedInUser);
                        handleSetNewLoggedInUser(newSignedInUser);
                        if (newSignedInUser) {
                            history("/dashboard/subscription");
                            setSigningIn(false);
                        }
                    }
                })
        }
    };

    // storing state to local storage
    const handleSetNewLoggedInUser = (newLoggedInUser) => {
        localStorage.setItem("newLoggedInUser", JSON.stringify(newLoggedInUser))
    }

    return (
        <div className="login-div">
            <HeaderNavbar />
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-box">
                    <h4>
                        <b>{newUser ? "Create an account" : "Login"}</b>
                    </h4>
                    {newUser && (
                        <input
                            style={errors.name && { borderBottom: "1px solid red" }}
                            {...register("name", {
                                required: "This field is required",
                                pattern: {
                                    value: /^[A-Z]/,
                                    message: "First letter should be uppercase",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Name contains only 20 characters",
                                },
                            })}
                            onKeyUp={() => trigger("name")}
                            required
                            type="text"
                            placeholder="Name"
                        />
                    )}
                    {newUser && errors.name && (
                        <small className="err-message text-end">
                            {errors.name?.message}
                        </small>
                    )}

                    <input
                        style={errors.email && { borderBottom: "1px solid red" }}
                        {...register("email", {
                            required: "This field is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid Email Address",
                            },
                        })}
                        onKeyUp={() => trigger("email")}
                        required
                        type="text"
                        placeholder="Email"
                    />
                    {errors.email && (
                        <small className="err-message">{errors.email?.message}</small>
                    )}

                    <div className="d-flex">
                        <input
                            style={errors.password && { borderBottom: "1px solid red" }}
                            {...register("password", {
                                required: "This field is required",
                                pattern: {
                                    value: /\d+/g,
                                    message: "Password must have at least one numeric value",
                                },
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            onKeyUp={() => trigger("password")}
                            required
                            type={showPass ? "text" : "password"}
                            placeholder="Password"
                        />
                        <button onClick={() => setShowPass(!showPass)} className="eye-btn d-flex text-end">{showPass ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</button>
                    </div>
                    {errors.password && (
                        <small className="err-message">{errors.password?.message}</small>
                    )}

                    <div className="d-flex">
                        <input
                            style={errors.confirmPassword && { borderBottom: "1px solid red" }}
                            {...register("confirmPassword", {
                                required: "This field is required",
                                validate: (value) =>
                                    value === password.current || "This password don't match",
                            })}
                            onKeyUp={() => trigger("confirmPassword")}
                            required
                            type={showConfirmPass ? "text" : "password"}
                            placeholder="Confirm Password"
                        />
                        <button onClick={() => setShowConfirmPass(!showConfirmPass)} className="eye-btn d-flex text-end">{showConfirmPass ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</button>
                    </div>
                    {errors.confirmPassword && (
                        <small className="err-message">
                            {errors.confirmPassword?.message}
                        </small>
                    )}
                    <br />
                    {newUser && signedInError.signUpSuccess && (
                        <small className="text-success">
                            {signedInError.signUpSuccess}
                        </small>
                    )}
                    {newUser && signedInError.signUpError && (
                        <small className="err-message">{signedInError.signUpError}</small>
                    )}
                    {newUser === false && signedInError.signInSuccess && (
                        <small className="text-success">
                            {signedInError.signInSuccess}
                        </small>
                    )}
                    {newUser === false && signedInError.signInError && (
                        <small className="err-message">{signedInError.signInError}</small>
                    )}

                    {newUser ? (
                        <button
                            onClick={handleSubmit(onSignUpDetailSubmit)}
                            type="submit"
                            className="form-input-btn"
                        >
                            Create an account
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit(onSignInDetailSubmit)}
                            type="submit"
                            className="form-input-btn"
                        >
                            Login
                        </button>
                    )}
                    <p>
                        {newUser ? "Already" : "Don't"} have an account?
                        <button onClick={() => setNewUser(!newUser)} className="toggle-btn">
                            {newUser ? "Login" : "Create account"}
                        </button>
                    </p>
                    <p className="or-edit">
                        <span className="or-text">Or</span>
                    </p>
                    <button onClick={handleGoogleSignIn} className={`social-btn google-btn btn btn-danger ${signingIn && "disabled"}`}>
                        {
                            signingIn ? <span><Spinner
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />Logging...</span> : <span><FontAwesomeIcon icon={faGoogle} />Continue with Google</span>}

                    </button>
                    <button onClick={handleFacebookSign} className={`social-btn facebook-btn btn btn-primary ${signingIn && "disable"}`}>
                        <span><FontAwesomeIcon icon={faFacebookF} />Continue with Facebook</span>
                    </button>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default Login;
