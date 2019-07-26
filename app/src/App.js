import reactSvg from './react.svg'
import './App.css'

import React, { PureComponent } from 'react'
const domain = 'http://localhost:3001'

class App extends PureComponent {
  state = {
    players: [],
    teams: [],
  }

  componentDidMount() {
    fetch(`${domain}/players`)
      .then(response => {
        return response.json();
      })
      .then(players => {
        this.setState({ players })
      });
    fetch(`${domain}/teams`)
      .then(response => {
        return response.json();
      })
      .then(teams => {
        this.setState({ teams })
      });
  }

  render() {
    const { players, teams } = this.state

    return <div className="App">
      <div className="App-players App-flex">
        {/* 
          TODO ejercicio 2
          Debes obtener los players en lugar de los equipos y pintar su nombre. 
          Borra todo el código que no sea necesario. Solo debe existir un título: Los jugadores
          y una lista con sus nombres. 
          ** Los comentarios de los ejercicios no los borres.
        */}
        {/* 
          TODO ejercicio 3
          Vamos a pasar a darle diseño. Crea el diseño propuesto en el readme con los requerimientos que se necesite.
          Guiate por las imágenes.
         */}
		 {players.map(player => {
		  return (
		    <div className="App-player" key={player.id}>
			  <div className="App-player-img">
			    <img src={player.img}/>
			  </div>
			  <div className="App-player-data">
			    <div className="App-player-section">
				  <div className="App-player-name">{player.name}</div>
				  <div className="App-player-position">{player.position}</div>
				</div>
				{
				  teams.map(team => {
					if (player.teamId === team.id) {
					  return (
					    <div className="App-player-team">{team.name}</div>
					  )
					}
				  })
				}			
			  </div>
			  {
				teams.map(team => {
				  if (player.teamId === team.id) {
					return (
				  <img className="App-player-shield" src={team.shield}/>
					)
				  }
				})
			  }			
			</div>
		  )
		 })
	    }
      </div>
    </div>
  }
}

export default App
