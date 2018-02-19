import React, {Component} from 'react';
import axios from 'axios';
import { Form,  Input, Button,  Card } from 'antd';
import 'antd/dist/antd.css';


const FormItem = Form.Item;

// var id = localStorage._id;

export default class CRUD extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            
            _id: '',
            id: '',
            index: '',
            firstname: '',
            address: '',
            email: '',
            contact: '',
            user: [],
            data : [],
            sample : []

        };
    }

    getInitialState() {  
      return { firstname: '' ,address: '',email:'',contact:'',id:'',Buttontxt:'Save', user: []};  
    }

    handleChange(e) {  
        this.setState({[e.target.name]: e.target.value});  
    }

    componentWillMount() {
    
        axios.post("http://192.168.1.103:8000/showUserDetails",{
        })
        
        .then((response)=>{
            this.setState({
                
                user : response.data,
                data : response.data

            });
        });
    }

    // componentWillMount() {
    //     axios.post("http://192.168.1.103:8000/showUserDetails")
    //       .then((response) => {

    //         this.setState({ 
    //             user : response.data,
    //             data : response.data 
    //         });
            
    //         console.log("COMPONENT WILL Mount user data :", + response.data );
    //   })
    // }

    // componentWillMount() {
    //     var self = this;
    //     axios.post("http://192.168.1.103:8000/showUserDetails",{
    //     })
    //     .then(function(response){
    //         console.log(response.data);
    //         self.setState({
    //             data: response.data,
    //             user : response.data
    //         });
    //     });
    // }


    DeleteData(id) {
        axios.delete("http://192.168.1.103:8000/deleteUserDetails",{
            id: this.state.data.id
        })
        
        .then((response)=>{
            this.setState({
                user: response.data
            });
        });
    }

    // EditData(item) {           
    //     this.setState = {firstname: item.firstname,address:item.address,contact:item.contact,email:item.email,id:item._id,Buttontxt:'Update'};  
    // }

    editUserdata() {
        alert("edit button initial clicked");
        axios.post("http://192.168.1.103:8000/showEditUserDetails",{
          
        })
        .then((response)=>{
            this.setState({
                data: response.data,
                sample:response.data
            });
        });

        alert("edit button end clicked");
    }

    AddData() {
        axios.post("http://192.168.1.103:8000/addUserDetails",{
            firstname:this.state.firstname,
            address: this.state.address,
            email: this.state.email,
            contact: this.state.contact
        
        })
        .then((response)=>{
            this.setState({
                data: response.data,
                id: '',
                firstname: '',
                address: '',
                email: '',
                contact: ''
            });
        });
    }

    UpdateData() {
        axios.post("http://192.168.1.103:8000/updateUserDetails",{
            id:this.state.id,
            firstname:this.state.firstname,
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
                            <Input size="large" placeholder="Name" onChange={(value) => this.setState({firstname: value.target.value})} style={{width:250}}/>
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
                                        <td>{item._id}</td> 
                                        <td>{item.firstname}</td>                        
                                        <td>{item.address}</td>  
                                        <td>{item.email}</td>  
                                        <td>{item.contact}</td>  
                                        <td>   
                                            <Button
                                                type="primary"
                                                style={{width:100, alignItems:'center'}}
                                                onClick={this.editUserdata.bind(item._id)}
                                            >
                                                Edit
                                            </Button>
                                        </td>   
                                        <td>   
                                            <Button
                                                type="primary"
                                                style={{width:100, alignItems:'center'}}
                                                onClick={this.DeleteData.bind(this)}
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

                <div>
                    <Card title="Update User Details ">
                        <Form style={{backgroundColor:'#f2f2f2', padding:10, marginBottom:10}}>
                            <FormItem {...formItemLayout} label="Name">
                                <Input size="large" placeholder="Name" value={this.state.firstname} onChange={(value) => this.setState({name: value.target.value})} style={{width:250}}/>
                            </FormItem>
                            <FormItem {...formItemLayout} label="Address">
                                <Input size="large" placeholder="Address" value={this.state.address} onChange={(value) => this.setState({address: value.target.value})} style={{width:250}}/>
                            </FormItem>
                            <FormItem {...formItemLayout} label="Email">
                                <Input size="large" placeholder="Email" value={this.state.email} onChange={(value) => this.setState({email: value.target.value})} style={{width:250}}/>
                            </FormItem>
                            <FormItem {...formItemLayout} label="Contact">
                                <Input size="large" type="number" placeholder="Contact" value={this.state.contact} onChange={(value) => this.setState({contact: value.target.value})} style={{width:250}}/>
                            </FormItem>
                            
                            <center style={{backgroundColor:'#f2f2f2', padding:10, marginBottom:10}}>
                                {this.state.message}
                            </center>
                            <Button
                                type="primary"
                                style={{width:100, marginLeft:500, alignItems:'center'}}
                                onClick={this.UpdateData.bind(this)}
                            >
                                Update
                            </Button>

                        </Form>
                    </Card>


                                    {/* <tr key={data.id}>    
                                        <td>{data.firstname}</td>                        
                                        <td>{data.address}</td>  
                                        <td>{data.email}</td>  
                                        <td>{data.contact}</td>  
                                        <td>   
                                            <Button
                                                type="primary"
                                                style={{width:100, alignItems:'center'}}
                                                onClick={this.editUserdata.bind(this)}
                                            >
                                                Edit
                                            </Button>
                                        </td>   
                                        <td>   
                                            <Button
                                                type="primary"
                                                style={{width:100, alignItems:'center'}}
                                                onClick={this.DeleteData.bind(this)}
                                            >
                                                Delete
                                            </Button>
                                        </td>   
                                    </tr>   */}

                </div>
            </div>
        );
    }
}