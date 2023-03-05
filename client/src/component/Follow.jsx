import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { client } from "@/utils/client";
import { uid } from "uid";

const Follow = ({ post }) => {
  const [followers, setFollowers] = useState([]);
  const user = useSelector((state) => state.user.user);

  //follow or unfollow
  const followOrUnfollow = async () => {
    try {
      const query = `*[_type == "user" && _id == "${post.userId}"][0].followers`;
      const currentFollowers = await client.fetch(query);
      const newFollowers = currentFollowers.find((i) => i._key === user.sub)
        ? currentFollowers.filter((i) => i._key !== user.sub)
        : [
            ...currentFollowers,
            { _type: "reference", _ref: user.sub, _key: user.sub },
          ];
      const res = await client
        .patch(post.userId)
        .set({
          followers: newFollowers,
        })
        .commit();
      setFollowers(res.followers);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {followers?.find((i) => i._key === user.sub) ? (
        <button
          onClick={followOrUnfollow}
          className="bg-[#252525] px-6 py-2 rounded items-center hover:bg-[#474747] text-mainRed border-mainRed border"
        >
          Unfollow{" "}
        </button>
      ) : (
        <button
          onClick={followOrUnfollow}
          className="bg-[#252525] px-6 py-2 rounded items-center hover:bg-[#474747] text-mainRed border-mainRed border"
        >
          Follow{" "}
        </button>
      )}
    </div>
  );
};

export default Follow;
