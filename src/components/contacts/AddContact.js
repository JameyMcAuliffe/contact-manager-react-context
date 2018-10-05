import React, {Component} from 'react';
import uuid from 'uuid'
import {Consumer} from '../../context';

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
								<div className="form-group">
									<label htmlFor="name">Name</label>
									<input 
										type="text" 
										className="form-control form-control-lg"
										name="name"
										placeholder="Enter name..."
										value={name}
										onChange={this.onChange}/>
								</div>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input 
										type="text" 
										className="form-control form-control-lg"
										name="email"
										placeholder="Enter email..."
										value={email}
										onChange={this.onChange}/>
								</div>
								<div className="form-group">
									<label htmlFor="phone">Phone</label>
									<input 
										type="text" 
										className="form-control form-control-lg"
										name="phone"
										placeholder="Enter phone number..."
										value={phone}
										onChange={this.onChange}/>
								</div>
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
