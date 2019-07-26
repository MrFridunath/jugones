import reactSvg from './react.svg'
import './App.css'

import React, { PureComponent } from 'react'
const domain = 'http://localhost:3001'

class ModalTransferencia extends React.Component {
  
  constructor (props) {
	super(props);
	this.state = {teamValue: '', playerValue: ''};
	
	this.handleChangeTeam = this.handleChangeTeam.bind(this);
	this.handleChangePlayer = this.handleChangePlayer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTeam(event) {
    this.setState({teamValue: event.target.value});
  }
  
  handleChangePlayer(event) {
    this.setState({playerValue: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
	let data = {
	  playerId: this.state.playerValue,
	  teamId: this.state.teamValue
	};
	let headers = {
	  'Accept': 'application/json',
	  'Content-Type': 'application/json'
	};
	fetch(`${domain}/transfer`, {method: 'POST', headers: headers, body: JSON.stringify(data)})
      .then(response => {
        return response.json();
      })
      .then(message => {
        if (message.error) {
		  console.log('error: ' + message.message);
		  alert('error: ' + message.message);
		}
		else {
		  this.props.updateApp();
		  alert("La transferencia se realizó correctamente.");
		  this.props.handleModal();
		}
      });
  } 
 
  render() {
	var playersList = [];
	this.props.players.map(player => {
	  if (player.teamId !== this.state.teamValue) {
		playersList.push(player);
	  }
	})
	return (
	  <div className="Modal" style={(this.props.transferenciasVisible) ? {display: 'flex'} : {display: 'none'}}>
	    <form className="Modal-content" onSubmit={this.handleSubmit}>
		  <div className="Modal-body">
		    <div className="Modal-section-inline">
			  <div className="Modal-section-group">
			    <label>
				  <b>Equipos:</b>
				</label>
				<select className="App-select" value={this.state.teamValue} onChange={this.handleChangeTeam}>
				  {
				    this.props.teams.map(team => {
					  return (
					    <option value={team.id}>{team.name}</option>
					  )
					})
				  }
				</select>
			    {
				  this.props.teams.map(team => {
				    if (team.id === this.state.teamValue) {
					  return (
				        <div className="Modal-input-budget">
			              <b>Presupuesto:</b>
				          <span className="Modal-input-budget-style">{team.money} €</span>
				        </div>
					  )
					}
				  })
				}
			  </div>
			  <div className="Modal-section-group">
			    <label>
				  <b>Jugadores:</b>
				</label>
				<select className="App-select" value={this.state.playerValue} onChange={this.handleChangePlayer}>
				  {
				    playersList.map(player => {
					  return (
					    <option value={player.id}>{player.name}</option>
					  )
					})
				  }
				</select>
			  </div>
			</div>
		  </div>
		  <div className="Modal-footer">
		    <button type="button" className="App-button" onClick={this.props.handleModal}>Cerrar</button>
		    <button type="submit" className="App-button">Transferir</button>
		  </div>
		</form>
	  </div>
	)
  }	  
}

class ModalPichichis extends React.Component {
  
  constructor (props) {
	super(props);
	this.state = {ascendingOrder: false};
	this.toggleSortList = this.toggleSortList.bind(this);
  }
  
  toggleSortList () {
	this.setState({ascendingOrder: !this.state.ascendingOrder});
  }
  
  render() {
	var pichichisList = [];
	if (this.state.ascendingOrder) {
	  pichichisList = this.props.pichichis.sort((a,b) => (((a.goals) ? ((typeof a.goals === 'string') ? parseInt(a.goals.replace(/ /g, '')) : a.goals ) : 0) < ((b.goals) ? ((typeof b.goals === 'string') ? parseInt(b.goals.replace(/ /g, '')) : b.goals ) : 0) ? 1 : (((b.goals) ? ((typeof b.goals === 'string') ? parseInt(b.goals.replace(/ /g, '')) : b.goals ) : 0) < ((a.goals) ? ((typeof a.goals === 'string') ? parseInt(a.goals.replace(/ /g, '')) : b.goals ) : 0) ? -1 : 0)));
	}
	else {
	  pichichisList = this.props.pichichis.sort((a,b) => (((a.goals) ? ((typeof a.goals === 'string') ? parseInt(a.goals.replace(/ /g, '')) : a.goals ) : 0) > ((b.goals) ? ((typeof b.goals === 'string') ? parseInt(b.goals.replace(/ /g, '')) : b.goals ) : 0) ? 1 : (((b.goals) ? ((typeof b.goals === 'string') ? parseInt(b.goals.replace(/ /g, '')) : b.goals ) : 0) > ((a.goals) ? ((typeof a.goals === 'string') ? parseInt(a.goals.replace(/ /g, '')) : b.goals ) : 0) ? -1 : 0)));
	}
	return (
	  <div className="Modal" style={(this.props.pichichisVisible) ? {display: 'flex'} : {display: 'none'}}>
	    <div className="Modal-content">
		  <div className="Modal-body">
		    {
			  pichichisList.map(pichichi => {
				return (
				  <div key={pichichi.playerId} onClick={this.props.handleTransferenciasModal}>
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
		    <button className="App-button" onClick={this.toggleSortList}>{(this.state.ascendingOrder) ? 'Ordenar ascendentemente' : 'Ordenar descendentemente'}</button>
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
	this.toggleTransferenciaModal = this.toggleTransferenciaModal.bind(this);
	this.updateData = this.updateData.bind(this);
  }

  state = {
    players: [],
    teams: [],
    pichichis: [],
	pichichisVisible: false,
	transferenciasVisible: false
  }

  componentDidMount() {
	if (window.localStorage.getItem(`lastKnown_${window.location.href}`)) {
	  let lastKnownState = JSON.parse(window.localStorage.getItem(`lastKnown_${window.location.href}`));
	  this.setState({players: lastKnownState.data.players});
	  this.setState({teams: lastKnownState.data.teams});
	  this.setState({pichichis: lastKnownState.data.pichichis});
	}
	else {
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
	window.addEventListener("beforeunload", (event) => {
	  // event.preventDefault();
	  if (this.state.players.length > 0) {
        window.localStorage.setItem(
          `lastKnown_${window.location.href}`,
            JSON.stringify({
			  component: document.querySelector('#app').innerHTML,
              data: {
                players: this.state.players,
                teams: this.state.teams,
                pichichis: this.state.pichichis,
            }})
        );
	  }
    });
  }
  
  togglePichichisModal () {
	this.setState({pichichisVisible: !this.state.pichichisVisible});
  }
 
  toggleTransferenciaModal () {
	if (this.state.pichichisVisible) {
	  this.togglePichichisModal();
	}
	this.setState({transferenciasVisible: !this.state.transferenciasVisible});
  }
  
  updateData () {
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
		    <div className="App-player" key={player.id} onClick={this.toggleTransferenciaModal}>
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
	  <ModalPichichis handleModal={this.togglePichichisModal} handleTransferenciasModal={this.toggleTransferenciaModal} pichichisVisible={this.state.pichichisVisible} pichichis={this.state.pichichis} players={this.state.players} />
	  <ModalTransferencia updateApp={this.updateData} handleModal={this.toggleTransferenciaModal} transferenciasVisible={this.state.transferenciasVisible} teams={this.state.teams} players={this.state.players} />
    </div>
  }
}

export default App
