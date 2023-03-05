import React, { useEffect, useState } from "react";
import Navbar from "@/component/Navbar";
import SideBar from "@/component/SideBar";
import Post from "@/component/Post";
import { client } from "@/utils/client";
const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllPosts();
    getAllUsers();
  }, []);
  //GET Posts
  //Get All Posts
  const getAllPosts = async () => {
    try {
      const query = `*[_type == "post"] | order(_createdAt desc)`;
      const results = await client.fetch(query);
      setAllPosts(results);
    } catch (error) {
      console.log(error);
    }
  };
  //GET USER
  const getAllUsers = async () => {
    try {
      const query = `*[_type == "user"]`;
      const results = await client.fetch(query);
      setAllUsers(results);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="bg-[#121212] h h-screen">
        <div className="border-b border-[#2b2a2b]  h-[8vh] ">
          <div className="max-w-[1150px] h-screen mx-auto ">
            <Navbar />
          </div>
        </div>
        <div className="flex   max-w-[1150px]  mx-auto justify-between ">
          <SideBar />
          <div className="w-10/12  md:w-7/12 flex-col flex h-[91vh] overflow-y-auto pt-5  posts">
            {allPosts?.map((post, i) => (
              <div key={i}>
                <Post post={post} allUsers={allUsers} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
