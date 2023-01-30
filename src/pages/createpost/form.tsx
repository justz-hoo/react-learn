import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';

interface postData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a titile"),
    description: yup
      .string()
      .required("You must add a description to the post"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: postData) => {
    await addDoc(postsRef, {
      // key1
      // title: data.title,
      // description: data.description,
      // key2
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)} className='postForm'>
      <input placeholder="Title ..." className="title" {...register("title")} />
      <p style={{ color: "darkred" }}>{errors.title?.message}</p>
      <textarea placeholder="Description ..." className="des"{...register("description")} />
      <p style={{ color: "darkred" }}>{errors.description?.message}</p>
      <input type="submit" className="submitButton" value='send'/>
    </form>
  );
};
