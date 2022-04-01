import Vue from 'vue'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

function toastOk(message) {
  Toast.fire({
    icon: 'success',
    title: message,
  })
}

function toastError(error) {
  const message =
    error.response?.data?.message || error.message || 'An error occured'
  if (message === 'Unauthorized') this.$auth.logout()
  else
    Toast.fire({
      icon: 'error',
      title: message,
    })
}

export default (_, inject) => {
  inject('success', toastOk)
  inject('error', toastError)
}
