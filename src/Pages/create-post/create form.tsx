import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateformData {
  Tittle: string;
  Description: string;
}

export const Createform = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const schema = yup.object().shape({
    Tittle: yup.string().required("you must add a tittle"),
    Description: yup.string().required("you must add a description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateformData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const oncreatePost = async (data: CreateformData) => {
    await addDoc(postsRef, {
      // ...data
      Tittle: data.Tittle,
      Description: data.Description,
      username: user?.displayName,
      userId: user?.uid,
    });

    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit(oncreatePost)}>
      <input placeholder="Tittle" {...register("Tittle")} />
      <p style={{ color: "red" }}>{errors.Tittle?.message}</p>
      <textarea placeholder="Description" {...register("Description")} />
      <p style={{ color: "red" }}>{errors.Description?.message}</p>
      <input type={"submit"} className={"submitBtn"} />
    </form>
  );
};
