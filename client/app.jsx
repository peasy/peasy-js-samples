import React from 'react';
import ReactDOM from 'react-dom';
//import './app.css';

//console.log(square(11)); // 121
//console.log(diag(4, 3)); // 5

//class ButtonContainer extends React.Component {
	//constructor(props) {
		//super(props);
		//this.state = {
			//disabled: false
		//};
	//}
	//onClick = () => {
		//this.setState({ disabled: !this.state.disabled });
	//}
	//render() {
		//return (
			//<div>
				//<KendoReactButtons.Button onClick={this.onClick}>Button 1</KendoReactButtons.Button>
				//<KendoReactButtons.Button disabled={this.state.disabled}>Button 2</KendoReactButtons.Button>
			//</div>
		//);
	//}
//}

ReactDOM.render(
	<div>
		<p>Button</p>
	</div>,
	document.getElementById('app')
);
