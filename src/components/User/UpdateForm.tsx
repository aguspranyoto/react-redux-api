import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getUserByIdAction,
  resetUpdateUserStatus,
  updateUserAction,
} from "../../slices/UserSlice";
import { RootState } from "../../app/store";
import { ApiStatus, IUserForm } from "../../types/User.type";

const UpdateForm = () => {
  const { id } = useParams();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const user = useAppSelector((state: RootState) => state.user.singleUser);
  const updateUserStatus = useAppSelector(
    (state: RootState) => state.user.updateUserStatus
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(getUserByIdAction(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name || ""); // Provide a fallback value if user.name is undefined
      setEmail(user.email || ""); // Provide a fallback value if user.email is undefined
    }
  }, [user]);

  useEffect(() => {
    if (updateUserStatus === ApiStatus.success) {
      setName("");
      setEmail("");
      dispatch(resetUpdateUserStatus());

      navigate("/user");
    }
  }, [updateUserStatus]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: IUserForm = { name, email };

    dispatch(updateUserAction({ id: user.id, data }));
  };

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-3xl font-bold my-4">Create new user</h1>
        <Link className="px-4 py-2 bg-slate-600 text-white" to="/user">
          Back to list
        </Link>
      </div>
      <div className="border w-full border-slate-600">
        <form
          action=""
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col p-4">
            <label htmlFor="name">Name</label>
            <input
              className="p-4 border border-slate-600"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col p-4">
            <label htmlFor="email">Email</label>
            <input
              className="p-4 border border-slate-600"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col p-4 mb-4">
            <button className="px-4 py-4 bg-slate-600 text-white" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
