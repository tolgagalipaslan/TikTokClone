import { client } from "@/utils/client";
import { uid } from "uid";

//Follow or Unfollow
export const followOrUnfollow = async (userId, user) => {
  try {
    const query = `*[_type == "user" && _id == "${userId}"][0].followers`;
    const currentFollowers = await client.fetch(query);
    const newFollowers = currentFollowers.find((i) => i._key === user.sub)
      ? currentFollowers.filter((i) => i._key !== user.sub)
      : [
          ...currentFollowers,
          { _type: "reference", _ref: user.sub, _key: user.sub },
        ];
    const res = await client
      .patch(userId)
      .set({
        followers: newFollowers,
      })
      .commit();
    return res.followers;
  } catch (error) {
    console.log(error);
  }
};

// Get All Users

export const getAllUsers = async () => {
  try {
    const query = `*[_type == "user"]`;
    const res = await client.fetch(query);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get Single User

export const getSingleUser = async (id) => {
  try {
    const query = `*[_type == "user" && _id=="${id}"][0] `;
    const res = await client.fetch(query);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get All Post

export const getAllPosts = async () => {
  try {
    const query = `*[_type == "post"] | order(_createdAt desc)`;
    const res = await client.fetch(query);

    return res;
  } catch (error) {
    console.log(error);
  }
};
//GetMypost
export const getMyPosts = async (userId) => {
  try {
    const query = `*[_type == "post" && userId =="${userId}"] | order(_createdAt desc)`;
    const res = await client.fetch(query);

    return res;
  } catch (error) {
    console.log(error);
  }
};
// Get Single Post

export const getSinglePost = async (id) => {
  try {
    const query = `*[_type == "post" && _id=="${id}"][0] `;
    const res = await client.fetch(query);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get like or Unlike
export const likeOrUnlike = async (postId, user) => {
  try {
    const query = `*[_type == "post" && _id == "${postId}"][0].likes`;
    const currentLikes = await client.fetch(query);
    const newLikesList = currentLikes.find((i) => i._key === user.sub)
      ? currentLikes.filter((i) => i._key !== user.sub)
      : [
          ...currentLikes,
          { _type: "reference", _ref: user.sub, _key: user.sub },
        ];
    const res = await client
      .patch(postId)
      .set({
        likes: newLikesList,
      })
      .commit();
    return res.likes;
  } catch (error) {
    console.log(error);
  }
};

// Post Comment
export const leaveAComment = async (postId, user, message) => {
  try {
    const query = `*[_type == "post" && _id == "${postId}"][0].comments`;
    const currentComments = await client.fetch(query);

    const res = await client
      .patch(postId)
      .set({
        comments: [
          ...currentComments,
          {
            _type: "comment",
            _key: uid(),
            comment: message,
            name: user.name,
            picture: user.picture,
            userId: user.sub,
          },
        ],
      })
      .commit();

    return res.comments;
  } catch (error) {
    console.log(error);
  }
};

//Delete Comment
export const deleteComment = async (postId, comment, user) => {
  if (user.sub !== comment.userId) {
    return null;
  } else {
    try {
      const query = `*[_type == "post" && _id == "${postId}"][0].comments`;
      const currentComments = await client.fetch(query);
      const newComments = currentComments.filter(
        (i) => i._key !== comment._key
      );
      const res = await client
        .patch(postId)
        .set({
          comments: newComments,
        })
        .commit();

      return res.comments;
    } catch (error) {
      console.log(error);
    }
  }
};
