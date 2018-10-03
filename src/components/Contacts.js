import React, {Component} from 'react';

import Contact from './Contact';

class Contacts extends Component {
	constructor() {
		super();
		this.state = {
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
			]
		}
	}

	deleteContact =(id) => {
		const {contacts} = this.state;
		const newContacts = contacts.filter(contact => contact.id !== id);

		this.setState({
			contacts: newContacts
		});
	}

	render() {
		const {contacts} = this.state;

		return (
			<div>
				{contacts.map((contact) => (
					<Contact key={contact.id} contact={contact} deleteClickHandler={this.deleteContact.bind(this, contact.id)}/>
				))}
			</div>
		);
	}
}

export default Contacts;
