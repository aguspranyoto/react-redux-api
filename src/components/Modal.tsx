import { IUser } from "../types/User.type";

interface ModalProps {
  user: IUser;
  title: string;
  onClose: () => void;
  isModalOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ user, title, onClose, isModalOpen }) => {
  return (
    <div
      className={`${
        isModalOpen
          ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          : "hidden"
      } `}
    >
      <div className="bg-white shadow-lg overflow-hidden w-11/12 max-w-md">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-700">
            <strong>ID:</strong> {user.id}
          </p>
          <p className="text-gray-700">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-600 text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
