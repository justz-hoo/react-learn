import { getDocs, collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Post } from "./post";
import "../../styles/main.css";
import { Navbar } from "../../components/navbars";

export interface MyPost {
  id: string;
  userId: string;
  username: string;
  title: string;
  description: string;
}

export const Main = () => {
  const postsRef = collection(db, "posts");
  const [postsList, setPostsList] = useState<MyPost[] | null>(null);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as MyPost[]
    );
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="main">
      <div className="all-posts">
        {postsList?.map((post: MyPost) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  );
};
