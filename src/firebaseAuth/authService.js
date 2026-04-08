import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const registerUser = async (fullName, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await updateProfile(userCredential.user, { displayName: fullName });
    return userCredential.user;
  } catch (error) {
    console.error("Firebase Login Error:", error.code, error.message);

    switch (error.code) {
      case "auth/user-not-found":
        throw new Error("No user found with this email");
      case "auth/wrong-password":
        throw new Error("Incorrect password");
      case "auth/invalid-credential":
        throw new Error("Invalid email or password");
      case "auth/operation-not-allowed":
        throw new Error("Email/password login is not enabled in Firebase");
      default:
        throw new Error(error.message);
    }
  }
};

export const loginUser = async (email, password) => {
  // console.log("Password inside service:", password);
  if (!password) {
    throw new Error("Password missing before Firebase call");
  }
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error("Firebase Login Error:", error.code, error.message);

    switch (error.code) {
      case "auth/user-not-found":
        throw new Error("No user found with this email");
      case "auth/wrong-password":
        throw new Error("Incorrect password");
      case "auth/invalid-credential":
        throw new Error("Invalid email or password");
      case "auth/operation-not-allowed":
        throw new Error("Email/password login is not enabled in Firebase");
      default:
        throw new Error(error.message);
    }
  }
};

export const logoutUser = async () => {
  await signOut(auth);
};
