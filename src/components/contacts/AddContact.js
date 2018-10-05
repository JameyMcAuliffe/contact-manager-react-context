import React, {Component} from 'react';
import uuid from 'uuid'
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';

class AddContact extends Component {
	state = {
		name: '',
		email: '',
		phone: ''
	}

	onChange = e => this.setState({[e.target.name]: e.target.value});

	onSubmit = (dispatch, e) => {
		e.preventDefault();
		const {name, email, phone} = this.state;
		const newContact = {
			//uuid generates an id
			id: uuid(),
			name, 
			email, 
			phone
		};

 		dispatch({type: 'ADD_CONTACT', payload: newContact});

 		//clear inputs
 		this.setState({
 			name: '',
 			email: '',
 			phone: ''
 		});
	}

	render() {
		const {name, email, phone} = this.state;
		return (
		<Consumer>
			{value => {
				const {dispatch} = value;
				return(
					<div className="card mb-3">
						<div className="card-header">Add Contact</div>
						<div className="card-body">
							<form onSubmit={this.onSubmit.bind(this, dispatch)}>
								<TextInputGroup 
									label="Name"
									name="name"
									value={name}
									placeholder="Enter a name..."
									onChange={this.onChange}
								/>
								<TextInputGroup 
									label="Email"
									name="email"
									type="email"
									value={email}
									placeholder="Enter an email..."
									onChange={this.onChange}
								/>
								<TextInputGroup 
									label="Phone"
									name="phone"
									value={phone}
									placeholder="Enter a phone number..."
									onChange={this.onChange}
								/>
								<input type="submit" value="Add Contact" className="btn btn-block btn-light"/>
							</form>
						</div>
					</div>
				)			
			}}			
		</Consumer>
		);
	}
}

export default AddContact;
