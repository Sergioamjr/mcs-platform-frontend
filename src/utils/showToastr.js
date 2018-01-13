import toastr from 'toastr'

const showToastr = (data, type) => {
  switch (type) {
    case 'error':
      data.errors.map(item => toastr.error(item))
      break
    case 'success':
      toastr.success(data)
      break
    default:
      return
  }
}

// warning, success, error, info
export default showToastr
