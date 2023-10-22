import React from "react"
import { Link } from "react-router-dom"
const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/movies">
              Movies
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/rentals">
              Rentals
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/customers">
              Customers
            </Link>
          </li>
          {!user && (
            <React.Fragment>
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <li>
                <Link className="nav-link" to="/profile">
                  {user.name}
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  )
  {
    /* // <nav classNameName="navbar navbar-expand-lg navbar-light bg-light">
    //   <div classNameName="container-fluid">
    //     <a classNameName="navbar-brand" href="#">
    //       Vidly
    //     </a>
    //     <div classNameName="collapse navbar-collapse">
    //       <ul>
    //         <li classNameName="nav-item">
    //           <Link classNameName="nav-link" to="/movies">
    //             Movies
    //           </Link>
    //         </li>
    //         <li classNameName="nav-item">
    //           <Link classNameName="nav-link" to="/rentals">
    //             <span>Rentals</span>
    //           </Link>
    //         </li>
    //         <li classNameName="nav-item">
    //           <Link classNameName="nav-link" to="/customers">
    //             <span>Customers</span>
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav> */
  }
}

export default NavBar
