import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../utils/client";

import PostVideo from "../component/post/PostVideo";
import PostInfo from "../component/post/PostInfo";

const PostDetails = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [postedByUser, setPostedByUser] = useState({});

  useEffect(() => {
    getSinglePost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);
  const getSinglePost = async () => {
    try {
      const query = `*[_type == "post" && _id == "${params.id}"]`;
      const results = await client.fetch(query);

      setPost(results[0]);
      getPostedByUser(results[0].postedBy._ref);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className="w-full h-screen bg-black flex ">
      <PostVideo post={post} />
      <PostInfo postedByUser={postedByUser} post={post} />
    </div>
  );
};

export default PostDetails;
