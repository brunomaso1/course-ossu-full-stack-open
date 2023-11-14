const LogOut = ({ setUser }) => {
  const handleLogout = (event) => {
    localStorage.removeItem('localStorageUser')
    setUser('')
  }

  return (
    <button type="button" onClick={handleLogout}>logout</button>
  )
}

export default LogOut