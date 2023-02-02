import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { MyPost as IPost } from "./main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props {
  post: IPost;
}

interface LikeUser {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const likesRef = collection(db, "likes");
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<LikeUser[] | null>(null);
  const { post } = props;

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );

      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async () => {
    try {
      const like2DeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const like2DeleteData = await getDocs(like2DeleteQuery);
      const like2DeleteId = like2DeleteData.docs[0].id;
      const like2Delete = doc(db, "likes", like2DeleteId);
      await deleteDoc(like2Delete);

      setLikes(
        (prev) => prev && prev.filter((like) => like.likeId && like.likeId !== like2DeleteId)
      );
       
    } catch (error) {
      console.log(error);
    }
  };

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    // console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    if (data.docs.length > 0) {
      setLikes(
        data.docs.map((doc) => ({
          userId: doc.data().userId,
          likeId: doc.data().id,
        }))
      );
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid) ? true : false;

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="post">
      <div className="post-title">
        {post.title}
      </div>
      <div className="post-content">
        <p>{post.description}</p>
      </div>
      <div className="post-details">
        <div className="post-username">@{post.username}</div>
        <div className="post-likes">
          <button onClick={hasUserLiked ? removeLike : addLike} className='like-btn'>
            {!hasUserLiked ? (
              <svg
                style={{ paddingTop: "3px" }}
                // t="1675084303619"
                // class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3024"
                width="16"
                height="16"
              >
                <path
                  d="M411.904 153.728c19.797333-63.232 54.186667-90.24 122.026667-70.656l1.706666 0.554667c19.84 6.101333 42.666667 17.706667 64.085334 37.162666 33.706667 30.72 53.76 73.301333 53.76 126.805334 0 47.786667-2.773333 77.312-10.88 110.805333l-0.256 0.938667h175.488c107.264 0 149.888 72.362667 122.922666 192.682666l-2.304 9.856-5.461333 18.005334-20.608 67.114666-9.642667 30.677334-9.173333 28.672-17.066667 51.626666-11.648 33.621334-7.210666 20.053333-9.984 26.368-6.101334 15.232c-29.525333 71.253333-90.453333 103.978667-170.112 94.592l-387.114666-28.8a587.690667 587.690667 0 0 0-7.381334-0.341333l-15.36-0.341334H218.026667l-12.501334-0.213333-9.984-0.426667-8.32-0.768-3.712-0.554666-7.125333-1.408-11.52-3.029334c-59.349333-17.621333-90.24-67.925333-90.24-139.605333v-283.52c0-90.538667 54.954667-142.208 148.565333-142.208l75.776-0.042667 5.205334-3.968a293.632 293.632 0 0 0 72.234666-88.32l6.101334-11.946666c6.101333-12.544 11.093333-25.685333 15.829333-41.002667l0.768-2.602667z m88.661333 8.064c-1.834667-0.426667-2.645333 0.170667-3.541333 2.773333l-3.882667 14.933334-10.666666 38.442666-2.56 8.533334a366.933333 366.933333 0 0 1-20.565334 53.162666 387.754667 387.754667 0 0 1-72.618666 102.442667 333.141333 333.141333 0 0 1-49.28 42.026667l5.504-3.925334v417.408l336.682666 25.344c41.898667 4.906667 65.621333-6.101333 80.213334-36.096l2.858666-6.229333 5.76-14.378667 9.514667-25.173333 6.912-19.285333 11.221333-32.469334 8.064-24.064 17.365334-53.76 19.2-61.354666 15.445333-50.858667c18.986667-76.074667 7.808-94.592-38.357333-94.592h-217.685334a53.632 53.632 0 0 1-50.730666-71.125333l2.176-6.4 3.328-10.922667c10.282667-35.754667 13.226667-59.136 13.226666-108.629333 0-48.426667-26.88-72.96-57.045333-82.261334l-3.712-1.152z m-242.944 270.122667h-34.389333c-47.616 0-63.232 14.72-63.232 56.917333v283.52c0 38.016 9.941333 53.333333 33.792 59.008l1.493333 0.341333 3.754667 0.554667 5.12 0.426667 11.562667 0.256h28.586666l13.312 0.085333v-401.066667z"
                  fill="#d4237a"
                  p-id="3025"
                ></path>
              </svg>
            ) : (
              <svg
                style={{ paddingTop: "4px", paddingLeft: "5px"}}
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2964"
                data-spm-anchor-id="a313x.7781069.0.i12"
                width="16"
                height="16"
              >
                <path
                  d="M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4-8.3-3.6-17.2-5.4-26.5-5.4H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h129.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM184 456V172h81v284h-81z m627.2 160.4H496.8l9.6 198.4c0.6 11.9-4.7 23.1-14.6 30.5-6.1 4.5-13.6 6.8-21.1 6.7-19.6-0.1-36.9-13.4-42.2-32.3L329 459.2V172h415.4c20.4 9.2 33.6 29.4 33.6 51.8 0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19c12.5 10.8 19.6 26.5 19.6 43 0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19c12.5 10.8 19.6 26.5 19.6 43 0 9.7-2.3 18.9-6.9 27.3l-14 25.5 21.9 19c12.5 10.8 19.6 26.5 19.6 43 0 19.1-11 37.5-28.8 48.4z"
                  p-id="2965"
                  data-spm-anchor-id="a313x.7781069.0.i11"
                  fill="#696969"
                ></path>
              </svg>
            )}
          </button>
          {<div className="likes-num">{ likes && likes.length > 0 ? (likes.length) : (' ')}</div>}
        </div>
      </div>
    </div>
  );
};
