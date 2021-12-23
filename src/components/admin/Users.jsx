import "../../css/admin/users.css";
import { useAuth } from "../../context/AuthProvider";
import Sidebar from "../SideBar";

export default function Users() {
  const { users } = useAuth();

  //Gives a list with all the users in the database
  return (
    <>
      <Sidebar />
      <div className="box-admin-pages">
        <div className="container-table-users">
          <h2>All Users</h2>
          <ul className="responsive-table-users">
            <li className="table-header">
              <div className="col col-1">User name</div>
              <div className="col col-2">E-mail</div>
              <div className="col col-3">Roles</div>
            </li>
            {users &&
              users.map((p) => (
                <li className="container-order-items" key={p.id}>
                  <div className="col col-1" data-label="User name">
                    {p.name}
                  </div>
                  <div className="col col-2" data-label="Email">
                    {p.email}
                  </div>
                  <div className="col col-3" data-label="Roles">
                    {p.roles.map((r, index) => {
                      return <p key={p.id + index}>{r}</p>;
                    })}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
