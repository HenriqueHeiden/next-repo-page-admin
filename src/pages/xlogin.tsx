import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function Home() {
  const { user, signin, setEmail, setSenha } = useAuth();

  console.log('User', user);

  const handleLogin = (event) => {
    event.preventDefault();
    signin();
  }

  return (
    <div >
      <h2>Seja bem vindo ao Hmshare</h2>
      <form onSubmit={handleLogin}>
        <label>
          E-mail:
          <input
            placeholder="email"
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label>
          Senha:
          <input type="text" name="senha" placeholder="Senha"
            onChange={event => setSenha(event.target.value)} />
        </label>
        <button type='submit'>Logar</button>
      </form>
    </div>
  )
}
