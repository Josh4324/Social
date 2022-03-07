import axios from "axios";
import { http } from "../utils/constant";

export const loginCall = async (cred) => {
  try {
    const res = await axios.post(`${http}/api/v1/user/login`, cred);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const signupCall = async (cred) => {
  try {
    const res = await axios.post(`${http}/api/v1/user/signup`, cred);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getPotentialFriends = async (signal, token) => {
  try {
    axios.defaults.headers.common["Authorization"] = "JWT " + token;
    const res = await axios.get(`${http}/api/v1/user/potential-friends`, {
      signal,
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getFriendsRequest = async (signal, token) => {
  try {
    axios.defaults.headers.common["Authorization"] = "JWT " + token;
    const res = await axios.get(`${http}/api/v1/user/friends-request`, {
      signal,
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getUserData = async (signal, token, id) => {
  try {
    axios.defaults.headers.common["Authorization"] = "JWT " + token;
    const res = await axios.get(`${http}/api/v1/user/${id}`, { signal });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const sendRequest = async (cred, token) => {
  try {
    axios.defaults.headers.common["Authorization"] = "JWT " + token;
    const res = await axios.post(`${http}/api/v1/friends/send-request`, cred);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const acceptRequest = async (id, cred, token) => {
  try {
    axios.defaults.headers.common["Authorization"] = "JWT " + token;
    const res = await axios.patch(
      `${http}/api/v1/friends/accept-request/${id}`,
      cred
    );
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getFriends = async (token) => {
  try {
    axios.defaults.headers.common["Authorization"] = "JWT " + token;
    const res = await axios.get(`${http}/api/v1/friends`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const followUser = async (cred, token) => {
  try {
    axios.defaults.headers.common["Authorization"] = "JWT " + token;
    const res = await axios.post(`${http}/api/v1/following/follow`, cred);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const unFollowUser = async (id, token) => {
  try {
    axios.defaults.headers.common["Authorization"] = "JWT " + token;
    const res = await axios.delete(`${http}/api/v1/following/unfollow/${id}`);
    return res;
  } catch (err) {
    return err.response;
  }
};
