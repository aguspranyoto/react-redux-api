import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ApiStatus, IUser } from "../../types/User.type";
import { useEffect, useState } from "react";
import {
  deleteUserAction,
  getUserByIdAction,
  getUserListAction,
} from "../../slices/UserSlice";
import Modal from "../Modal";

const UserList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    list: users,
    listStatus,
    singleUser,
  } = useAppSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserListAction());
  }, []);

  const handleDataToModal = (id: string) => {
    dispatch(getUserByIdAction(id));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      dispatch(deleteUserAction(id));
    }
  };

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-3xl font-bold my-4">User List</h1>
        <Link className="px-4 py-2 bg-slate-600 text-white" to="/user/create">
          Add user
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="border w-full">
          <thead className="">
            <tr className="">
              <th className="border p-2">No.</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {listStatus === ApiStatus.loading && (
              <tr className="text-center">
                <td colSpan={4} className="border p-2">
                  loading ...
                </td>
              </tr>
            )}
            {listStatus === ApiStatus.error && (
              <tr className="text-center">
                <td colSpan={4} className="border p-2">
                  Something went wrong
                </td>
              </tr>
            )}
            {listStatus === ApiStatus.idle &&
              users.map((user: IUser, index: number) => {
                return (
                  <tr className="text-center" key={user.id}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{user.name}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="p-2 inline-flex gap-2">
                      <button
                        className="px-2 py-1 border border-slate-900"
                        onClick={() => handleDataToModal(user.id)}
                      >
                        View
                      </button>
                      <Link
                        to={`/user/update/${user.id}`}
                        className="px-2 py-1 border border-slate-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-2 py-1 border border-slate-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Modal
          user={singleUser}
          title="View Detail User"
          isModalOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default UserList;
