import PostInfo from "./component/PostInfo";
import PostVideo from "./component/PostVideo";
import { getSinglePost } from "@/helpers/Api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "@/utils/client";

const MyPostDetails = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [userId, setUserId] = useState();
  const [postedByUser, setPostedByUser] = useState({});
  const [prevPostId, setPrevPostId] = useState("");
  const [nextPostId, setNextPostId] = useState("");

  useEffect(() => {
    getSinglePost(params.id).then((res) => {
      setPost(res);
      setUserId(res.userId);
      getPostedByUser(res.userId);
      getPreviousPost(res);
      getNextPost(res);
    });
  }, [params.id]);

  //Get PostedBy User
  const getPostedByUser = async (user) => {
    try {
      const query = `*[_type == "user" && _id == "${user}"][0]`;
      const results = await client.fetch(query);
      setPostedByUser(results);
    } catch (error) {
      console.log(error);
    }
  };

  //Get Previous Post
  const getPreviousPost = async (post) => {
    try {
      const query = `*[_type == "post" && userId=="${post.userId}" && dateTime(_createdAt) > dateTime('${post._createdAt}')]| order(_createdAt desc)`;
      const results = await client.fetch(query);

      setPrevPostId(results[results.length - 1]?._id);
    } catch (error) {
      console.log(error);
    }
  };
  //Get Previous Post
  const getNextPost = async (post) => {
    try {
      const query = `*[_type == "post" && userId=="${post.userId}" && dateTime(_createdAt) < dateTime('${post._createdAt}')]| order(_createdAt desc)`;
      const results = await client.fetch(query);
      setNextPostId(results[0]?._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen bg-black flex ">
      <PostVideo prevPostId={prevPostId} nextPostId={nextPostId} post={post} />
      <PostInfo postedByUser={postedByUser} post={post} />
    </div>
  );
};

export default MyPostDetails;
