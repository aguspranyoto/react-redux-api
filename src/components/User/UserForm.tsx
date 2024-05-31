import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createUserAction,
  getUserByIdAction,
  resetCreateUserStatus,
  resetUpdateUserStatus,
  updateUserAction,
} from "../../slices/UserSlice";
import { ApiStatus, IUserForm } from "../../types/User.type";
import { RootState } from "../../app/store";
import { toastError } from "../../lib/ToastifyConfig";

const UserForm = ({ isEditForm }: { isEditForm: boolean }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { createUserStatus } = useAppSelector((state: RootState) => state.user);
  const user = useAppSelector((state: RootState) => state.user.singleUser);
  const updateUserStatus = useAppSelector(
    (state: RootState) => state.user.updateUserStatus
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: IUserForm = { name, email };

    if (name && email) {
      if (isEditForm) {
        dispatch(updateUserAction({ id: user.id, data }));
      } else {
        dispatch(createUserAction(data));
      }
    } else {
      toastError("Please enter name and email");
    }
  };

  // const handleBackToListClick = () => {
  //   console.log("Clicked Back to list");
  //   // setName("");
  //   // setEmail("");
  // };

  useEffect(() => {
    if (updateUserStatus === ApiStatus.success) {
      setName("");
      setEmail("");
      dispatch(resetUpdateUserStatus());

      navigate("/user");
    }
    if (createUserStatus === ApiStatus.success) {
      setName("");
      setEmail("");
      dispatch(resetCreateUserStatus());

      navigate("/user");
    }
  }, [createUserStatus, updateUserStatus, isEditForm]);

  useEffect(() => {
    if (id) dispatch(getUserByIdAction(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (isEditForm && user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user, isEditForm]);

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-3xl font-bold my-4">
          {isEditForm ? "Update" : "Create new"} User
        </h1>
        <Link
          // onClick={handleBackToListClick}
          className="px-4 py-2 bg-slate-600 text-white"
          to="/user"
        >
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
              defaultValue={name}
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
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col p-4 mb-4">
            <button
              className={`${
                createUserStatus === ApiStatus.loading ||
                updateUserStatus === ApiStatus.loading
                  ? "cursor-progress "
                  : ""
              }px-4 py-4 bg-slate-600 text-white`}
              type="submit"
              disabled={
                createUserStatus === ApiStatus.loading ||
                updateUserStatus === ApiStatus.loading
              }
            >
              {isEditForm
                ? updateUserStatus === ApiStatus.loading
                  ? "Updating..."
                  : "Update"
                : createUserStatus === ApiStatus.loading
                ? "Creating..."
                : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
