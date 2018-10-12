import React, {Component} from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
	switch(action.type) {
		case 'DELETE_CONTACT':
			return {
				...state,
				contacts: state.contacts.filter(contact => contact.id !== action.payload) 
			};
		case 'ADD_CONTACT':
			return {
				...state,
				contacts: [action.payload, ...state.contacts] 
			};
		case 'UPDATE_CONTACT':
			return{
				...state,
				contacts: state.contacts.map(
					contact => 
						contact.id === action.payload.id ? (contact = action.payload) : contact)
			};
		default:
			return state;
	}
}

//Provider component wraps around everything in App.js
export class Provider extends Component {
	state = {
		contacts: [
			
		],
		//dispatch is how you access an action in other components
		dispatch: action => {
			//this.setState(state => reducer(state, action))
			this.setState((state) => {
				return reducer(state, action);
			});
		}
	}

	//-------Async/Await------
	async componentDidMount() {
		const res = await axios.get('https://jsonplaceholder.typicode.com/users')
		
		this.setState({
			contacts: res.data
		});
	}


	//--------Axios---------
	// componentDidMount() {
	// 	axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
	// 		this.setState({
	// 			contacts: res.data
	// 		});
	// 	});
	// }

	render() {
		return (
			//value allows us to pass in whatever piece of state we want
			<Context.Provider value={this.state}>
				{this.props.children}
			</Context.Provider>
		)
	}
}

//use Consumer in any component you want to access the global state
export const Consumer = Context.Consumer;
