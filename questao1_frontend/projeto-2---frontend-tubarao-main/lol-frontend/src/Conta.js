import { useEffect, useState } from "react";
import axios from "axios";

function Conta({ summoner }) {
  const [elo, setElo] = useState(null)

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/summoners/${summoner.id}/elo/`)
      .then((res) => setElo(res.data));
  }, [summoner.id]);

  if (elo === null) return (
    <>
        Carregando...
    </>
  )

  return (
    <p><strong>{summoner.owner_name}</strong> - {elo.tier || 'UNRANKED'} {elo.rank} {elo.leaguePoints && `${elo.leaguePoints} PDL`}</p>
  );
}

export default Conta;