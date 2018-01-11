import toastr from 'toastr'

const showToastr = ({ data }, type) => {
  data.errors.map(item => toastr.error(item))
}

// warning, success, error, info
export default showToastr
