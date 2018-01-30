import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';


export default class App extends React.Component {

  constructor(props) {
    super(props);
  this.weatherInfo = this.weatherInfo.bind(this)
  }

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
                    url: "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f42f2be0f14d409cb69e3a96b1349dfc",
                    traditional: true,
                    cache: true,
                    async: true,
                    success: function (data) {
                      var datap  = data;
                      ref.setState({data:datap.articles},() => {
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
                  <td>{todo.source.name}</td>
                  <td>{todo.title}</td>
                  <td>{todo.publishedAt}</td>
                  <td>{todo.url}</td>
                 
                  
              </tr>
          );



    return (
     <div style={{textAlign: 'center'}}>
  <table id="example" className="display" cellSpacing="0" width="100%">
        <thead>
            <tr>
                <th>SOURCE NAME</th>
                <th>TITLE</th>
                <th>PUBLISHED AT</th>
                <th>URL</th>
                
            </tr>
        </thead>
      
        <tbody>
            {tableRow}
        </tbody>
    </table>

    </div>);
  }
}
