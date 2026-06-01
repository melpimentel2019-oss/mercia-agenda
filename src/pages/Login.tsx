import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  const navigate = useNavigate()

  function entrar() {

    if (
      usuario === 'mercia' &&
      senha === '123456'
    ) {

      localStorage.setItem(
        'admin_logado',
        'sim'
      )

      navigate('/admin')

    } else {

      alert('Usuário ou senha inválidos')

    }
  }

  return (
    <div
      style={{
        background: '#11131F',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          background: '#1A1D2E',
          padding: '30px',
          borderRadius: '12px',
          width: '300px',
          textAlign: 'center'
        }}
      >
        <h2 style={{ color: '#E6C35C' }}>
          Login Admin
        </h2>

        <input
          placeholder="Usuário"
          value={usuario}
          onChange={(e) =>
            setUsuario(e.target.value)
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) =>
            setSenha(e.target.value)
          }
        />

        <br /><br />

        <button onClick={entrar}>
          Entrar
        </button>

      </div>
    </div>
  )
}

export default Login