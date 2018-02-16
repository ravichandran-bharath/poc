import React, {Component} from 'react';
import axios from 'axios';
import { Form,  Input, Button,  Card } from 'antd';
import 'antd/dist/antd.css';


const FormItem = Form.Item;


export default class CRUD extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            
            id: '',
            name: '',
            address: '',
            email: '',
            contact: '',
            user: []

        };
    }

    getInitialState() {  
      return { name: '' ,address: '',email:'',contact:'',id:'',Buttontxt:'Save', user: []};  
    }

    handleChange(e) {  
        this.setState({[e.target.name]: e.target.value});  
    }

    componentWillMount() {
    
        axios.post("http://192.168.1.103:8000/showUserDetails",{
        })
        
        .then((response)=>{
            this.setState({
                user: response.data
            });
        });
    }

    DeleteData() {
        axios.delete("http://192.168.1.103:8000/deleteUserDetails",{
            id: this.state.id
        })
        
        .then((response)=>{
            this.setState({
                user: response.data
            });
        });
    }

    EditData(item) {           
        this.setState({name: item.name,address:item.address,contact:item.contact,email:item.email,id:item._id,Buttontxt:'Update'});  
    }

    AddData() {
        axios.post("http://192.168.1.103:8000/addUserDetails",{
        name:this.state.name,
        address: this.state.address,
        email: this.state.email,
        contact: this.state.contact
        
        })
        .then((response)=>{
            this.setState({
                data: response.data,
                id: '',
                name: '',
                address: '',
                email: '',
                contact: ''
            });
        });
    }

    UpdateData() {
        axios.post("http://192.168.1.103:8000/updateUserDetails",{
            id:this.state.id,
            name:this.state.name,
            address: this.state.address,
            email: this.state.email,
            contact: this.state.contact
        
        })
        .then((response)=>{
            this.setState({
                data: response.data
            });
        });
    }

    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        return(
            <div>
                <Card title=" User Details - CRUD Operations ">
                    <Form style={{backgroundColor:'#f2f2f2', padding:10, marginBottom:10}}>
                        <FormItem {...formItemLayout} label="Name">
                            <Input size="large" placeholder="Name" onChange={(value) => this.setState({name: value.target.value})} style={{width:250}}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="Address">
                            <Input size="large" placeholder="Address" onChange={(value) => this.setState({address: value.target.value})} style={{width:250}}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="Email">
                            <Input size="large" placeholder="Email" onChange={(value) => this.setState({email: value.target.value})} style={{width:250}}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="Contact">
                            <Input size="large" type="number" placeholder="Contact" onChange={(value) => this.setState({contact: value.target.value})} style={{width:250}}/>
                        </FormItem>
                        
                        <center style={{backgroundColor:'#f2f2f2', padding:10, marginBottom:10}}>
                            {this.state.message}
                        </center>
                        <Button
                        type="primary"
                        style={{width:100, marginLeft:500, alignItems:'center'}}
                        onClick={this.AddData.bind(this)}
                        >
                            Submit
                        </Button>

                    </Form>
                </Card>

                <div style={{backgroundColor:'#f2f2f2', padding:10, margin:20}}> 
                    <Card title=" User Details "> 
                    <table>
                        <tbody>  
                            <tr><th><b>S.No</b></th><th><b>NAME</b></th><th><b>ADDRESS</b></th><th><b>EMAIL</b></th><th><b>CONTACT</b></th><th><b>Edit</b></th><th><b>Delete</b></th></tr>  
                            {this.state.user.map((item, index) => (  
                                <tr key={index}>  
                                    <td>{index+1}</td>   
                                    <td>{item.name}</td>                        
                                    <td>{item.description}</td>  
                                    <td>{item.email}</td>  
                                    <td>{item.contact}</td>  
                                    <td>   
                                        <Button
                                            type="primary"
                                            style={{width:100, alignItems:'center'}}
                                            onClick={(e) => {this.EditData(item)}}
                                        >
                                            Edit
                                        </Button>
                                    </td>   
                                    <td>   
                                        <Button
                                            type="primary"
                                            style={{width:100, alignItems:'center'}}
                                            onClick={(e) => {this.DeleteData(item._id)}}
                                        >
                                            Delete
                                        </Button>
                                    </td>   
                                </tr>  
                            ))}  
                        </tbody>  
                    </table>  
                    </Card>
                </div>
            </div>
        );
    }
}