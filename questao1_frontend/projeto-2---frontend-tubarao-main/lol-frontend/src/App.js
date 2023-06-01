import { useEffect, useState } from "react";
import axios from "axios";
import Note from "./components/Note";
import "./App.css";
import Conta from "./Conta";

function App() {
  const [notes, setNotes] = useState([]);
  const [ownerName, setOwnerName] = useState('')
  const [summonerName, setSummonerName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOwner = (event) => {
    setOwnerName(event.target.value)
  }

  const handleSummoner = (event) => {
    setSummonerName(event.target.value)
  }

  const submit = async () => {
    setLoading(true)
    await axios.post(`http://127.0.0.1:8000/api/summoners/`, {
      summoner_name: summonerName,
      owner_name: ownerName
    })
    setOwnerName('')
    setSummonerName('')
    setLoading(false)
    await refresh()
  }

  const refresh = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/summoners/")
      .then((res) => setNotes(res.data));
  }

  useEffect(() => {
    refresh()
  }, []);

  console.log(notes);

  return (
    <div className="App">

      <input placeholder="Nome" disabled={loading} className="bloco" type="text" value={ownerName} onChange={handleOwner} /> 
      <input placeholder="Nickname do LoL" disabled={loading} className="bloco" type="text" value={summonerName} onChange={handleSummoner} /> 
      <button disabled={loading} className="botao" onClick={submit}>Enviar</button>
  
    <div className="topicos">
      {notes.map((conta, i) => (
        <Conta key={i} summoner={conta}/>
      ))}
    </div>
    </div>
  );
}

export default App;