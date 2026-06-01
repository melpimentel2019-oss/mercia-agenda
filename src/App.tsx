import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

const HORARIOS = [
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
]

function App() {
  const [servicos, setServicos] = useState<any[]>([])
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [servicosSelecionados, setServicosSelecionados] = useState<string[]>([])
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')

  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([])
  const [agendamentos, setAgendamentos] = useState<any[]>([])

 

  useEffect(() => {
  carregarServicos()
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

  
async function carregarHorarios(dataSelecionada: string) {

  if (!dataSelecionada) return

  const { data, error } = await supabase
    .from('agendamentos')
    .select('horario')
    .eq('data_agendamento', dataSelecionada)

  console.log('DATA ESCOLHIDA:', dataSelecionada)
  console.log('RESULTADO:', data)
  console.log('ERRO:', error)

  const horarios = data?.map(item => item.horario) || []

  setHorariosOcupados(horarios)
}
  
  async function carregarServicos() {
    const { data } = await supabase
      .from('servicos')
      .select('*')

    setServicos(data || [])
  }

  function selecionarServico(nome: string) {

  if (servicosSelecionados.includes(nome)) {

    setServicosSelecionados(
      servicosSelecionados.filter(s => s !== nome)
    )

  } else {

    setServicosSelecionados([
      ...servicosSelecionados,
      nome
    ])
  }
}
  async function agendar() {

    async function cancelarAgendamento(id: number) {

  const confirmar = confirm(
    'Deseja realmente cancelar este agendamento?'
  )

  if (!confirmar) return

  const { error } = await supabase
    .from('agendamentos')
    .delete()
    .eq('id', id)

  if (error) {
    alert('Erro ao cancelar')
    return
  }

  alert('Agendamento cancelado!')

  carregarAgendamentos()
}
    

alert("Horário escolhido: " + horario)

    const { error } = await supabase
      .from('agendamentos')
      .insert([
        {
          cliente: nome,
          telefone,
          servico: servicosSelecionados.join(', '),
          data_agendamento: data,
          horario,
        },
      ])

    if (error) {
      alert('Erro ao agendar')
      console.error(error)
      return
    }

    alert('Agendamento realizado com sucesso!')
    carregarAgendamentos()

    setNome('')
setTelefone('')
setServicosSelecionados([])
setData('')
setHorario('')
  }

  return (
  <div
  style={{
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center'
  }}
>
<img
  src="/logo.jpeg"
  alt="Mercia Pimentel"
  style={{
    width: '120x',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '50%',
    border: '2px solid #E6C35C',
    boxShadow: '0 0 25px rgba(230,195,92,0.5)',
    marginBottom: '5px'
  }}
/>

<h1
  style={{
    color: '#E6C35C',
    marginBottom: '0px',
    fontSize: '2.5rem',
    lineHeight: '1'
  }}
>

</h1>

<h1
  style={{
    color: '#E6C35C',
    marginBottom: '0px',
    fontSize: '2.5rem',
    lineHeight: '1'
  }}

  
>
  Mercia
</h1>

<h1
  style={{
    color: '#E6C35C',
    marginTop: '0px',
    fontSize: '3rem',
    lineHeight: '1'
  }}
>
  Pimentel
</h1>

<p
  style={{
    color: '#E6C35C',
    marginTop: '10px'
  }}
>
  Estudio de Beleza
</p>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="WhatsApp"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />

      <br /><br />

      <h3 style={{ color: '#E6C35C' }}>
  💇‍♀️ Serviços Desejados
</h3>

{servicos.map((s) => (
  <div
    key={s.id}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      marginBottom: '10px',
      color: 'white'
    }}
  >
    <input
      type="checkbox"
      checked={servicosSelecionados.includes(s.nome)}
      onChange={() => selecionarServico(s.nome)}
    />

    <span>{s.nome}</span>
  </div>
))}

      <br /><br />

      <input
  type="date"
  value={data}
  onChange={(e) => {
    setData(e.target.value)
    carregarHorarios(e.target.value)
  }}
/>
      

      <br /><br />

      <select
        value={horario}
        onChange={(e) => setHorario(e.target.value)}
      >
        <option value="">Escolha um horário</option>
        {!horariosOcupados.includes('09:00') && (
  <option>09:00</option>
)}

{!horariosOcupados.includes('10:00') && (
  <option>10:00</option>
)}

{!horariosOcupados.includes('11:00') && (
  <option>11:00</option>
)}

{!horariosOcupados.includes('14:00') && (
  <option>14:00</option>
)}

{!horariosOcupados.includes('15:00') && (
  <option>15:00</option>
)}

{!horariosOcupados.includes('16:00') && (
  <option>16:00</option>
)}
      </select>

      <br /><br />

      <button onClick={agendar}>
        AGENDAR
      </button>

    </div>
  )
}

export default App