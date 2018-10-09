import React, {Component} from 'react';
import uuid from 'uuid'
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';

class AddContact extends Component {
	state = {
		name: '',
		email: '',
		phone: '',
		errors: {}
	}

	onChange = e => this.setState({[e.target.name]: e.target.value});

	onSubmit = (dispatch, e) => {
		e.preventDefault();
		const {name, email, phone} = this.state;

		//Check for errors
		if(name === '') {
			this.setState({errors: {name: 'Name is required'}});
			return;
		} else if (email === '') {
			this.setState({errors: {email: 'Email is required'}});
			return;
		} else if (phone === '') {
			this.setState({errors: {phone: 'Phone is required'}});
			return;
		}

		const newContact = {
			//uuid generates an id
			id: uuid(),
			name, 
			email, 
			phone,
			errors: {}
		};

 		dispatch({type: 'ADD_CONTACT', payload: newContact});

 		//clear inputs
 		this.setState({
 			name: '',
 			email: '',
 			phone: ''
 		});

 		this.props.history.push('/');
	}

	render() {
		const {name, email, phone, errors} = this.state;
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
									error={errors.name}
								/>
								<TextInputGroup 
									label="Email"
									name="email"
									type="email"
									value={email}
									placeholder="Enter an email..."
									onChange={this.onChange}
									error={errors.email}
								/>
								<TextInputGroup 
									label="Phone"
									name="phone"
									value={phone}
									placeholder="Enter a phone number..."
									onChange={this.onChange}
									error={errors.phone}
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
