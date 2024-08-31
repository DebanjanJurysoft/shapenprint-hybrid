export default function ({ route, redirect }) {
  const available_paths = [
    'product',
    'contact_us',
    'how_we_work',
    'login',
    'error',
    'terms_and_conditions',
    'cart',
    'checkout',
    'orders',
    'address'
  ]
  if (route.path != '/' && !available_paths.find(e => route.path.split('/').includes(e))) {
    return redirect('/error')
  }
}