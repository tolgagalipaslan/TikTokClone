import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../utils/client";

const PostDetails = () => {
  const params = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    getSinglePost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);
  const getSinglePost = async () => {
    try {
      const query = `*[_type == "post" && _id == "${params.id}"]`;
      const results = await client.fetch(query);
      setPost(results[0]);
      console.log(results[0]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen bg-black flex">
      <div className="md:w-[70%]  w-full bg-mainRed  h-full">
        <div>
          <video src={post.video}></video>
        </div>
      </div>
      <div className="w-[30%] md:flex hidden bg-white  h-full"></div>
    </div>
  );
};

export default PostDetails;
