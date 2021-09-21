const validateInfo = (values) =>{
  let errors = {}

  if(!values.name.trim()) {
    errors.name = 'Name is required';
  }
  if(!values.image.trim()) {
    errors.image = 'Image is required';
  }
  if(!values.barcode.trim()) {
    errors.barcode = 'Barcode is required';
  }
  if(!values.price) {
    errors.price = 'Price is required';
  }
  if(!values.quantity) {
    errors.quantity = 'Quantity is required';
  }
  return errors;
}

export default validateInfo