import "./Navbar.css";

export const Navbar = () => {
  return (
    <header className="navbar fixed-top navbar-expand-sm">
      <nav className="container navbar_navigation">
        <div>
          <h1 aria-label="My ToDo App">My ToDo App</h1>
        </div>

        {/* <div className="navbar-toggler-icon">
          <a href="/">
            <i className="fas fa-user"></i>
          </a>
        </div> */}
      </nav>
    </header>
  );
};
