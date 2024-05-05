import Swal from 'sweetalert2';

const alertSuccess = (title) => {
  Swal.fire({
    title,
    toast: true,
    icon: 'success',
    confirmButtonText: 'Ok',
  });
};

const alertError = (title) => {
  Swal.fire({
    title,
    toast: true,
    icon: 'error',
    confirmButtonText: 'Ok',
  });
};

export { alertSuccess, alertError };
