import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'


function App() {
  const [servicos, setServicos] = useState<any[]>([])
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [servicosSelecionados, setServicosSelecionados] = useState<string[]>([])
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')

  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([])
  const [, setAgendamentos] = useState<any[]>([])

 

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
    width: '120px',
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
    fontSize: '3.5rem',
    marginBottom: '0',
    lineHeight: '1'
  }}
>
  Mercia
</h1>

<h1
  style={{
    color: '#FFFFFF',
    fontSize: '3.5rem',
    marginTop: '0',
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
<p
  style={{
    color: '#EAEAEA',
    fontSize: '18px',
    maxWidth: '500px',
    margin: '20px auto 40px',
    lineHeight: '1.6'
  }}
>
  🌟 Agende seu horário no estúdio de beleza
mais desejado da região.
  <br />
  Realce sua beleza com atendimento
personalizado e resultados incríveis.
</p>

      <input
        placeholder="👤 Seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="📱 Seu WhatsApp"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />

      <br /><br />

      <h3 style={{ color: '#E6C35C' }}>
  💎 Escolha os serviços desejados
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

<button
  onClick={agendar}
  style={{
    background: '#E6C35C',
    color: '#111',
    border: 'none',
    padding: '18px 30px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 0 20px rgba(230,195,92,.4)'
  }}
>
  ✨ AGENDAR MEU HORÁRIO
</button>

<p
  style={{
    marginTop: '40px',
    color: '#888',
    fontSize: '13px'
  }}
>
  Atendimento com hora marcada • Mercia Pimentel Beauty
</p>

</div>
  )
}

export default App