import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';
import clsx from 'clsx';

export default function AuthNav() {
  const navLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div>
      <NavLink className={navLinkClass} to="/register">
        Register
      </NavLink>
      <NavLink className={navLinkClass} to="/login">
        Log In
      </NavLink>
    </div>
  );
}
