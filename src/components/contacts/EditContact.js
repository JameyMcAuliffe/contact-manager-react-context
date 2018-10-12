import React, {Component} from 'react';
import axios from 'axios';

import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';

class EditContact extends Component {
	state = {
		name: '',
		email: '',
		phone: '',
		errors: {}
	}

	async componentDidMount() {
		const {id} = this.props.match.params;
		const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

		const contact = res.data;
		this.setState({
			name: contact.name,
			email: contact.email,
			phone: contact.phone
		});
	}

	onChange = e => this.setState({[e.target.name]: e.target.value});

	onSubmit = async (dispatch, e) => {
		e.preventDefault();
		const {name, email, phone} = this.state;
		const {id} = this.props.match.params;

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

		const updContact = {name, email, phone};

		const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);
		dispatch({type: 'UPDATE_CONTACT', payload: res.data});

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
						<div className="card-header">Edit Contact</div>
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
								<input type="submit" value="Update Contact" className="btn btn-block btn-light"/>
							</form>
						</div>
					</div>
				)			
			}}			
		</Consumer>
		);
	}
}

export default EditContact;


