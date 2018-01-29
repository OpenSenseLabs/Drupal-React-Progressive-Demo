import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import "../style/table.scss";
import axios from 'axios';


export default class App extends React.Component {
  render() {
  	var products = [{
      id: 1,
      name: "Product1",
      price: 120
  }, {
      id: 2,
      name: "Product2",
      price: 80
  }
  ]
  axios.get('http://samples.openweathermap.org/data/2.5/box/city?bbox=12&appid=b6907d289e10d714a6e88b30761fae22')
      .then(res => {
        const posts = res
        this.setState({ posts });
      });
    return (
     <div style={{textAlign: 'center'}}>
	<table>
	<thead>
	<th>
	weather
	</th>
	<th>
	weather
	</th>
	<th>
	weather
	</th>
	<th>
	weather
	</th>
	<th>
	weather
	</th>
	</thead>
	<tbody>
	<td>
	</td>
	<td>
	</td>
	<td>
	</td>
	<td>
	</td>
	<td>
	</td>
	</tbody>
	</table>

	  </div>);
  }
}