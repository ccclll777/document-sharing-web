const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.name,
  role: state => state.user.role,
  email: state => state.user.email,
  id: state => state.user.id
}
export default getters
