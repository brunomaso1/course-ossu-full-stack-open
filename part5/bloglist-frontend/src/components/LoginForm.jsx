import { useState } from "react"
import loginService from "../services/login"
import blogsService from "../services/blogs"

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(event) {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      localStorage.setItem('localStorageUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log("Wrrong credentials: ", error);
    }
  }

  return (
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username: 
          <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          password: 
          <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </>
  )
}

export default LoginForm