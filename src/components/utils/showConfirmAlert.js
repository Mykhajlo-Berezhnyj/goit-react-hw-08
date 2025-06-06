import { confirmAlert } from 'react-confirm-alert';

export const showConfirmAlert = (title, message, buttons) => {
  confirmAlert({
    title,
    message,
    buttons,
  });
};
