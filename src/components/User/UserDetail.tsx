import { Link, useParams } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>User Detail of {id}</h1>
      <Link to={"/user"}>Back</Link>
    </div>
  );
};

export default UserDetail;
