import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';


export default class App extends React.Component {
	componentWillMount() {

		this.setState({data:[]});
	}
	componentDidMount(){
		this.weatherInfo();
		var interval = setInterval(this.weatherInfo,60000)

	}

	weatherInfo(){
		var ref = this;
		  $.ajax({
                    url: "http://samples.openweathermap.org/data/2.5/box/city?bbox=12&appid=b6907d289e10d714a6e88b30761fae22",
                    traditional: true,
                    cache: true,
                    async: true,
                    success: function (data) {
                    var datap  = data;
                    ref.setState({data:datap.list},() => {
                	console.log("setdata",ref.state.data);
                    })
				    $(document).ready(function() {
					    $('#example').DataTable();
					});
                                       
                    }
                    
                });
	}


  render() {
  	var ref = this;
  	
  	
            const tableRow = ref.state.data.map((todo, index) =>
	        	<tr key = {index} style={{textAlign: 'center'}}>
	                <td>{todo.name}</td>
	                <td>{todo.main.temp}</td>
	                <td>{todo.main.temp_min}</td>
	                <td>{todo.main.temp_max}</td>
	                <td>{todo.wind.speed}</td>
	                <td>{todo.weather[0].description}</td>
	                
	            </tr>
      		);



    return (
     <div style={{textAlign: 'center'}}>
	<table id="example" className="display" cellSpacing="0" width="100%">
        <thead>
            <tr>
                <th>NAME</th>
                <th>TEMPRATURE</th>
                <th>MIN TEMP</th>
                <th>MAX TEMP</th>
                <th>WIND SPEED</th>
                <th>WEATHER</th>
            </tr>
        </thead>
      
        <tbody>
            {tableRow}
        </tbody>
    </table>

	  </div>);
  }
}