import reactSvg from './react.svg'
import './App.css'

import React, { PureComponent } from 'react'
const domain = 'http://localhost:3001'

class ModalPichichis extends React.Component {
  
  constructor (props) {
	super(props);
  }
  
  render() {
	var pichichisList = this.props.pichichis;
	return (
	  <div className="Modal" style={(this.props.pichichisVisible) ? {display: 'flex'} : {display: 'none'}}>
	    <div className="Modal-content">
		  <div className="Modal-body">
		    {
			  pichichisList.map(pichichi => {
				return (
				  <div key={pichichi.playerId}>
				   {
					 this.props.players.map(player => {
					   if (player.id === pichichi.playerId) {
						 return (
						   <div className="App-pichichi">
						     <div className="App-player-img">
							   <img src={player.img}/>
							 </div>
							 <div className="App-pichichi-data">
							   <div className="App-player-name">{player.name}</div>
							   <div className="App-player-team">Goles:  {(pichichi.goals) ? ((typeof pichichi.goals === 'string') ? parseInt(pichichi.goals.replace(/ /g, '')) : pichichi.goals ) : 0}</div>
							 </div>
						   </div>
						 )
					   }
					 })
				   }
				  </div> 
				)
			  })
		    }
		  </div>
		  <div className="Modal-footer">
		    <button className="App-button" onClick={this.props.handleModal}>Cerrar</button>
		  </div>
		</div>
	  </div>
	)
  }	  
}

class App extends PureComponent {
  
  constructor (props) {
    super(props);
	this.togglePichichisModal = this.togglePichichisModal.bind(this);
  }

  state = {
    players: [],
    teams: [],
    pichichis: [],
	pichichisVisible: false
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
    fetch(`${domain}/pichichis`)
      .then(response => {
        return response.json();
      })
      .then(pichichis => {
        this.setState({ pichichis })
      });
  }
  
  togglePichichisModal () {
	this.setState({pichichisVisible: !this.state.pichichisVisible});
  }

  render() {
    const { players, teams, pichichis } = this.state

    return <div className="App">
	  <header className="App-heading">
	    <button className="App-button" onClick={this.togglePichichisModal}>Pichichis</button>
	  </header>
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
	  <ModalPichichis handleModal={this.togglePichichisModal} pichichisVisible={this.state.pichichisVisible} pichichis={this.state.pichichis} players={this.state.players} />
    </div>
  }
}

export default App
