import React, {Component} from 'react';

import Contact from './Contact';
import {Consumer} from '../context';

class Contacts extends Component {
	

	render() {
		//value comes from prop in Context.Provider of context.js, contains entire state obj
		return (
			<Consumer>
				{value => {
					const {contacts} = value;
					return (
						<div>
							{contacts.map((contact) => (
								<Contact 
									key={contact.id} 
									contact={contact} 
								/>
							))}
						</div>
					)
				}}
			</Consumer>
		);
	}
}

export default Contacts;
