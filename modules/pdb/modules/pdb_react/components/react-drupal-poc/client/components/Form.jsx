import React from 'react';
import { Form, StyledText, StyledRadio, StyledRadioGroup, StyledSelect, StyledCheckbox, StyledTextArea } from 'react-form';

const statusOptions = [
    {
      label: 'Single',
      value: 'single'
    },
    {
      label: 'In a Relationship',
      value: 'relationship'
    },
    {
      label: "It's Complicated",
      value: 'complicated'
    }
];


export default class Form1 extends React.Component {
	constructor( props ) {
      super( props );
      this.state = {};
    }


  render() {
	   return (
	        
	          <Form onSubmit={submittedValues => this.setState( { submittedValues } )}>
	            { formApi => (
	              <form onSubmit={formApi.submitForm} id="form2">
	                <label htmlFor="firstName">First name</label>
	                <StyledText field="firstName" id="firstName" />
	                <label htmlFor="lastName">Last name</label>
	                <StyledText field="lastName" id="lastName" />
	                
	                <label htmlFor="bio">Bio</label>
	                <StyledTextArea field="bio" id="bio" />
	                
	                <label htmlFor="status" className="d-block">Relationship status</label>
	                <StyledSelect field="status" id="status" options={statusOptions} />
	                <button type="submit" className="mb-4 btn">Submit</button>
	              </form>
	            )}
	          </Form>
	        
	      );
	}
}