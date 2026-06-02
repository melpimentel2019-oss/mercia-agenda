import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Admin() {
    if (
  localStorage.getItem('admin_logado')
  !== 'sim'
) {
  return <Navigate to="/login" />
}

  const [agendamentos, setAgendamentos] = useState<any[]>([])
  const [filtro, setFiltro] = useState('todos')
  const [busca, setBusca] = useState('')
  const hoje = new Date().toISOString().split('T')[0]
  const amanha = new Date()
amanha.setDate(amanha.getDate() + 1)



const agendamentosHoje = agendamentos.filter(
  item => item.data_agendamento === hoje
)


const dataAmanha = amanha
  .toISOString()
  .split('T')[0]

  const agendamentosAmanha = agendamentos.filter(
  item => item.data_agendamento === dataAmanha
)
const totalClientes = new Set(
  agendamentos.map(item => item.telefone)
).size

  console.log('HOJE:', hoje)
console.log('AMANHA:', dataAmanha)
console.log(agendamentos)


const agendamentosFiltrados =
(
  filtro === 'hoje'
    ? agendamentos.filter(
        item => item.data_agendamento === hoje
      )
    : filtro === 'amanha'
    ? agendamentos.filter(
        item => item.data_agendamento === dataAmanha
      )
    : agendamentos
)
.filter(item =>
  (item.cliente || '')
  .toLowerCase()
    .includes(busca.toLowerCase())
)
  useEffect(() => {
    carregarAgendamentos()
  }, [])

  async function carregarAgendamentos() {

    const { data } = await supabase
      .from('agendamentos')
      .select('*')
      .order('data_agendamento')
      .order('horario')

    setAgendamentos(data || [])
  }

 async function atualizarStatus(
  id: number,
  status: string
) {

  const { error } = await supabase
    .from('agendamentos')
    .update({
      status: status
    })
    .eq('id', id)

  if (error) {
    console.log(error)
    alert('Erro ao atualizar status')
    return
  }

  carregarAgendamentos()
}

  

  return (
  <div
    style={{
      background: '#11131F',
      minHeight: '100vh',
      padding: '30px',
      maxWidth: '1000px',
      margin: '0 auto',
      color: 'white',
      textAlign: 'center'
    }}
  >
<img
  src="/logo.jpeg"
  alt="Logo Mércia"
  style={{
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    border: '4px solid #E6C35C',
    marginBottom: '20px',
    boxShadow: '0 0 25px #E6C35C'
  }}
/>
      <h1
  style={{
    color: '#E6C35C',
    fontSize: '38px',
    marginBottom: '5px'
  }}
>
  ✨ Painel Administrativo
</h1>

<p
  style={{
    color: '#ccc',
    marginBottom: '20px'
  }}
>
  Salão Mércia Beauty
</p>
      <button
  onClick={() => {
    localStorage.removeItem('admin_logado')
    window.location.href = '/login'
  }}
  style={{
    background: '#C62828',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '20px'
  }}
>
  🚪 Sair
</button>
      <div
  style={{
    marginBottom: '20px'
  }}
>
  <button
    onClick={() => setFiltro('hoje')}
  >
    📅 Hoje
  </button>

  {' '}
  <div
  style={{
    background: '#1A1D2E',
    border: '1px solid #E6C35C',
    padding: '15px',
    borderRadius: '10px',
    minWidth: '180px'
  }}
>
  <h3>📅 Amanhã</h3>
  <h2>{agendamentosAmanha.length}</h2>
</div>

<div
  style={{
    background: '#1A1D2E',
    border: '1px solid #E6C35C',
    padding: '15px',
    borderRadius: '10px',
    minWidth: '180px'
  }}
>
  <h3>👥 Clientes</h3>
  <h2>
    {
      new Set(
        agendamentos.map(item => item.telefone)
      ).size
    }
  </h2>
</div>



    <button
      onClick={() => setFiltro('amanha')}
    >
      📅 Amanhã
  </button>

  {' '}

  <button
    onClick={() => setFiltro('todos')}
  >
    📋 Todos
  </button>





<input
  type="text"
  placeholder="🔍 Buscar cliente..."
  value={busca}
  onChange={(e) =>
    setBusca(e.target.value)
  }
  style={{
    padding: '10px',
    width: '250px',
    borderRadius: '8px',
    marginBottom: '20px'
  }}
/>
</div>
      <div
  style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  }}
>

  <div
    style={{
      background: '#1A1D2E',
      border: '1px solid #E6C35C',
      padding: '15px',
      borderRadius: '10px',
      minWidth: '180px'
    }}
  >
<div
  style={{
    background: '#1A1D2E',
    border: '1px solid #E6C35C',
    padding: '15px',
    borderRadius: '10px',
    minWidth: '180px'
  }}
>
  <h3>📅 Amanhã</h3>
  <h2>{agendamentosAmanha.length}</h2>
</div>

<div
  style={{
    background: '#1A1D2E',
    border: '1px solid #E6C35C',
    padding: '15px',
    borderRadius: '10px',
    minWidth: '180px'
  }}
>
  <h3>👥 Clientes</h3>
  <h2>{totalClientes}</h2>
</div>



    <h3>📅 Hoje</h3>
    <h2>{agendamentosHoje.length}</h2>
  </div>

  <div
    style={{
      background: '#1A1D2E',
      border: '1px solid #E6C35C',
      padding: '15px',
      borderRadius: '10px',
      minWidth: '180px'
    }}
  >
    <h3>📋 Total</h3>
    <h2>{agendamentos.length}</h2>
  </div>

</div>

      {agendamentosFiltrados.map((item) => (

        <div
          key={item.id}
          style={{
  border: '1px solid #E6C35C',
  background: '#1A1D2E',
  color: 'white',
  padding: '20px',
  borderRadius: '12px',
  marginBottom: '15px'
}}
        >
          <h2>{item.horario}</h2>

          <p>
            <strong>Cliente:</strong> {item.cliente}
          </p>

          <p>
            <strong>Telefone:</strong> {item.telefone}
          </p>

          <p>
            <strong>Serviço:</strong> {item.servico}
          </p>

     <p>
  <strong>Data:</strong> {item.data_agendamento}
</p>
<div style={{ marginBottom: '15px' }}>
  <p>
  <strong>Status:</strong>{' '}

  <span
    style={{
      background:
        item.status === 'Concluido'
          ? '#2E7D32'
          : item.status === 'Cancelado'
          ? '#C62828'
          : '#F9A825',
      padding: '6px 12px',
      borderRadius: '20px',
      fontWeight: 'bold'
    }}
  >
    {item.status}
  </span>
</p>
</div>

<a
  href={`https://wa.me/55${item.telefone}`}
  target="_blank"
  style={{
    display: 'inline-block',
    background: '#25D366',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '8px',
    textDecoration: 'none',
    marginRight: '10px'
  }}
>
  💬 WhatsApp
</a>
<a
  href={`tel:${item.telefone}`}
  style={{
    display: 'inline-block',
    background: '#1976D2',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '8px',
    textDecoration: 'none'
  }}
>
  📞 Ligar
</a>

<br /><br />

<button
  onClick={() =>
    atualizarStatus(
      item.id,
      'Agendado'
    )
  }
>
  🟡 Agendado
</button>

{' '}

<button
  onClick={() =>
    atualizarStatus(
      item.id,
      'Concluido'
    )
  }
>
  🟢 Concluído
</button>

{' '}

<button
 onClick={() => {
  if (
    window.confirm(
      'Deseja realmente cancelar este agendamento?'
    )
  ) {
    atualizarStatus(
      item.id,
      'Cancelado'
    )
  }
}}
>



  🔴 Cancelado
</button>


        </div>

      ))}

    </div>
  )
}

export default Admin