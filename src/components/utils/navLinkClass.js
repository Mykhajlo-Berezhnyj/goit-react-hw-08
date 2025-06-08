import clsx from 'clsx';

export const navLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
