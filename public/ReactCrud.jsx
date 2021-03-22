
var CadastrotAll = React.createClass({   
  
    getInitialState: function () {  
      return { name: '' ,address: '',email:'',contact:'',id:'',Buttontxt:'Salvar', data1: []};  
    },  
     handleChange: function(e) {  
          this.setState({[e.target.name]: e.target.value});  
      },  
    
    componentDidMount() {  
     
      $.ajax({  
         url: "api/getdata",  
         type: "GET",  
         dataType: 'json',  
         ContentType: 'application/json',  
         success: function(data) {           
           this.setState({data1: data});   
             
         }.bind(this),  
         error: function(jqXHR) {  
           console.log(jqXHR);  
               
         }.bind(this)  
      });  
    },  
      
  DeleteData(id){  
    var CadastroDelete = {  
          'id': id  
             };        
      $.ajax({  
        url: "/api/Removedata/",  
        dataType: 'json',  
        type: 'POST',  
        data: CadastroDelete,  
        success: function(data) {  
          alert(data.data);  
           this.componentDidMount();  
    
        }.bind(this),  
        error: function(xhr, status, err) {  
           alert(err);   
               
              
        }.bind(this),  
        });  
      },  
     
      EditData(item){           
     this.setState({name: item.name,address:item.address,contact:item.contact,email:item.email,id:item._id,Buttontxt:'Update'});  
       },  
    
     handleClick: function() {  
     
     var Url="";  
     if(this.state.Buttontxt=="Salvar"){  
        Url="/api/savedata";  
         }  
        else{  
        Url="/api/Updatedata";  
        }  
        var cadastrodata = {  
          'name': this.state.name,  
          'address':this.state.address,  
          'email':this.state.email,  
          'contact':this.state.contact,  
          'id':this.state.id,  
            
      }  
      $.ajax({  
        url: Url,  
        dataType: 'json',  
        type: 'POST',  
        data: cadastrodata,  
        success: function(data) {         
            alert(data.data);         
            this.setState(this.getInitialState());  
            this.componentDidMount();  
             
        }.bind(this),  
        error: function(xhr, status, err) {  
           alert(err);       
        }.bind(this)  
      });  
    },  
    
    render: function() {  
      return (   
        <div  className="container"  style={{marginTop:'50px'}}>  
         <p className="text-center" style={{fontSize:'25px'}}><b>Cadastre seus dados:</b></p>  
    <form>  
      <div className="col-sm-12 col-md-12" >   
    <table className="table">  
       <tbody>  
      <tr>  
        <td><b>Nome:</b></td>  
        <td>  
           <input className="form-control" type="text" value={this.state.name}    name="name" onChange={ this.handleChange } />  
            <input type="hidden" value={this.state.id}    name="id"  />  
        </td>  
      </tr>  
    
      <tr>  
        <td><b>Endereço:</b></td>  
        <td>  
        <input type="text" className="form-control" value={this.state.address}  name="address" onChange={ this.handleChange } />  
        </td>  
      </tr>  
    
      <tr>  
        <td><b>E-mail:</b></td>  
        <td>  
          <input type="text"  className="form-control" value={this.state.email}  name="email" onChange={ this.handleChange } />  
        </td>  
      </tr>  
    
    
      <tr>  
        <td><b>Celular:</b></td>  
        <td>  
          <input type="text"  className="form-control" value={this.state.contact}  name="contact" onChange={ this.handleChange } />  
        </td>  
      </tr>  
    
      <tr>  
        <td></td>  
        <td>  
          <input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />  
        </td>  
      </tr>  
    
   </tbody>  
      </table>  
  </div>  
     
    
  <div className="col-sm-12 col-md-12 ">  
     
   <table className="table table-bordered">  
   <thead className="thead-dark">
     <tr>
         <th><b>ID </b></th>
         <th scope="col"><b>Nome </b></th>
         <th scope="col"><b>Endereço </b></th>
         <th scope="col"><b>E-maill </b></th>
         <th scope="col"><b>Celular </b></th><th><b>Editar </b></th>
         <th scope="col"><b>Deletar </b></th>
    </tr> 
     </thead><tbody>
      {this.state.data1.map((item, index) => (  
          <tr key={index}>  
            <td className="ml-5">{index+1}</td>   
            <td>{item.name}</td>                        
            <td>{item.address}</td>  
            <td>{item.email}</td>  
            <td>{item.contact}</td>  
             <td>   
              
             <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(item)}}>Editar</button>      
            </td>   
            <td>   
               <button type="button" className="btn btn-danger" onClick={(e) => {this.DeleteData(item._id)}}>Deletar</button>  
            </td>   
          </tr>  
      ))}  
      </tbody>  
      </table>
      
       </div>  
  </form>          
        </div>  
      );  
    }  
  });  
    
  ReactDOM.render(<CadastrotAll  />, document.getElementById('root'))