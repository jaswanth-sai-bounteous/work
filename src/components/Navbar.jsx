import { NavLink } from 'react-router-dom';

export default function Navbar({ onReset }) {
  return (
    <header className="navbar">
      <div>
        <p className="eyebrow">Soft Strength Studio</p>
        <h1>Move gently. Grow stronger.</h1>
      </div>
      <nav className="nav-links" aria-label="Primary">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          end
        >
          Workouts
        </NavLink>
        <NavLink
          to="/progress"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Progress
        </NavLink>
        <button type="button" className="ghost-button" onClick={onReset}>
          Reset Progress
        </button>
      </nav>
    </header>
  );
}
