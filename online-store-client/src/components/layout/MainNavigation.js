import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import AuthContext from "../../store/auth-context";
import AuthService from "../../api/authService";

function MainNavigation() {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentRole, setCurrentRole] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const role = AuthService.getUserRole();

    if (user) {
      setCurrentUser(user);
      setCurrentRole(role);
    }
  }, [authCtx]);

  function logOut() {
    AuthService.logout();
    setCurrentUser(undefined);
    setCurrentRole(undefined);
    authCtx.setAuth(false);
  }

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
      <div className="navbar-nav mx-5">
        <li className="nav-item">
          <Link to={"/"} className="nav-link">
            Online store
          </Link>
        </li>
      </div>
      <div className="navbar-nav ms-auto mx-5">
        {currentRole === "Admin" ? (
          <li className="nav-item">
            <Link className="nav-link" to={"/"}>
              Admin panel
            </Link>
          </li>
        ) : (
          <></>
        )}
        <li className="nav-item">
          <Link
            to={"/cart"}
            className="nav-link mx-3"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              position: "relative",
            }}
            variant="outline-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>

            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.1rem",
                height: "1.1rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartCtx.totalItems}
            </div>
          </Link>
        </li>
        {currentUser ? (
          <li className="nav-item">
            <Link className="nav-link" onClick={logOut} to={"/"}>
              Logout
            </Link>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link to={"/log-in"} className="nav-link">
                Log in
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/sign-up"} className="nav-link">
                Sign up
              </Link>
            </li>
          </>
        )}
      </div>
    </nav>
  );
}

export default MainNavigation;
