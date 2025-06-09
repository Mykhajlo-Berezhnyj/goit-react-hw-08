import toast from 'react-hot-toast';

export function showError(action, error) {
  const message =
    (typeof error === 'string' && error) ||
    error?.message ||
    'Unknown error';

  toast.error(`${message}`);
}
