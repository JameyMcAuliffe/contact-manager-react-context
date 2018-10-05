import React, {Component} from 'react';

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
		default:
			return state;
	}
}

//Provider component wraps around everything in App.js
export class Provider extends Component {
	state = {
		contacts: [
			{
				id: 1,
				name: 'John Doe',
				email: 'jd@gmail.com',
				phone: '555-555-5555'
			},
			{
				id: 2,
				name: 'John Moe',
				email: 'jm@gmail.com',
				phone: '455-555-5555'
			},
			{
				id: 3,
				name: 'John Shwo',
				email: 'js@gmail.com',
				phone: '445-555-5555'
			}
		],
		//dispatch is how you access an action in other components
		dispatch: action => {
			//this.setState(state => reducer(state, action))
			this.setState((state) => {
				return reducer(state, action);
			});
		}
	}

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
