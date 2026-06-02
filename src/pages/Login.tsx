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
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background:
        'linear-gradient(135deg,#0B1020,#1A1D2E)',
      padding: '20px'
    }}
  >
    <div
      style={{
        background: '#1A1D2E',
        padding: '40px',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '420px',
        textAlign: 'center',
        boxShadow: '0 0 30px rgba(230,195,92,0.25)'
      }}
    >
      <img
        src="/logo.jpeg"
        alt="Mércia"
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: '4px solid #E6C35C',
          marginBottom: '20px'
        }}
      />

      <h1
        style={{
          color: '#E6C35C',
          marginBottom: '5px'
        }}
      >
        Salão Mércia Beauty
      </h1>

      <p
  style={{
    color: '#bdbdbd',
    marginBottom: '25px',
    fontSize: '14px'
  }}
>
  Sistema de gerenciamento de agendamentos
</p>

      <input
        type="text"
        placeholder="👤 Usuário"
        value={usuario}
        onChange={(e) =>
          setUsuario(e.target.value)
        }
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '10px',
          border: '1px solid #444',
          marginBottom: '15px'
        }}
      />

      <input
        type="password"
        placeholder="🔒 Senha"
        value={senha}
        onChange={(e) =>
          setSenha(e.target.value)
        }
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '10px',
          border: '1px solid #444',
          marginBottom: '25px'
        }}
      />

      <button
  onClick={✨ Acessar Painel}
  style={{
  width: '100%',
  background: '#E6C35C',
  color: '#111',
  border: 'none',
  padding: '15px',
  borderRadius: '12px',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  boxShadow: '0 0 15px rgba(230,195,92,.4)'
}}
>
  Entrar
</button>
<p
  style={{
    marginTop: '20px',
    color: '#777',
    fontSize: '12px'
  }}
>
  © 2026 Salão Mércia Beauty
</p>
       </div>
  </div>
)
}

export default Login