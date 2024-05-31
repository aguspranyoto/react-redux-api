import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createUserAction,
  resetCreateUserStatus,
} from "../../slices/UserSlice";
import { ApiStatus, IUserForm } from "../../types/User.type";
import { RootState } from "../../app/store";

const CreateForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { createUserStatus } = useAppSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: IUserForm = { name, email };

    dispatch(createUserAction(data));
  };

  useEffect(() => {
    if (createUserStatus === ApiStatus.success) {
      setName("");
      setEmail("");
      dispatch(resetCreateUserStatus());

      navigate("/user");
    }
  }, [createUserStatus]);

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

export default CreateForm;
