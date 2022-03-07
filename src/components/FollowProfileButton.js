import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { followUser, unFollowUser } from "../utils/apiCalls";
import { NotificationManager } from "react-notifications";

export default function FollowProfileButton(props) {
  const { token, id, userId, follow } = props;

  const followClick = async (friendID) => {
    const cred = {
      userID: userId,
      friendID,
    };
    const result = await followUser(cred, token);
    if (result) {
      console.log(result);
      NotificationManager.success("Followed", "Success");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    //props.onButtonClick(follow);
  };
  const unfollowClick = async (friendID) => {
    const result = await unFollowUser(friendID, token);
    if (result) {
      console.log(result);
      NotificationManager.success("unfollowed successfully", "Success");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };
  return (
    <div>
      {follow ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            unfollowClick(id);
          }}
        >
          {" "}
          Unfollow
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            followClick(id);
          }}
        >
          Follow
        </Button>
      )}
    </div>
  );
}
FollowProfileButton.propTypes = {
  following: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
