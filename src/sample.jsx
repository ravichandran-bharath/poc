import React, {Component} from 'react';
import axios from 'axios';
import { Form, Input, Button, Card, Modal } from 'antd';
import 'antd/dist/antd.css';


const FormItem = Form.Item;

// var id = localStorage._id;

export default class CRUD extends Component {
    

    constructor(props) {
        super(props);
        this.state = {

            visible: true,
            confirmLoading: false,

            _id: '',
            id: '',
            firstname: '',
            address: '',
            email: '',
            contact: '',
            user: []

        };
    }

    // getInitialState() {  
    //   return { firstname: '' ,address: '',email:'',contact:'',id:'',Buttontxt:'Save'};  
    // }

    componentDidMount() {
    
        axios.get("http://127.0.0.1:8000/showUserDetails",{
        })
        
        .then((response)=>{
            this.setState({
                
                user : response.data,
                data : response.data

            });  
        });
    }

    // componentWillMount() {
    //     axios.post("http://192.168.43.244:8000/showUserDetails")
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
    //     axios.post("http://192.168.43.244:8000/showUserDetails",{
    //     })
    //     .then(function(response){
    //         console.log(response.data);
    //         self.setState({
    //             data: response.data,
    //             user : response.data
    //         });
    //     });
    // }


    DeleteData() {
        axios.post("http://127.0.0.1:8000/deleteUserDetails",{
            _id: this.state.data._id
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

    editUserdata(_id) {
        alert("edit button initial clicked");
        axios.post("http://127.0.0.1:8000/showEditUserDetails",{
            _id : this.state._id
        })
        .then((response)=>{
            this.setState({
                data: response.data,
                sample:response.data
            });

            console.log();
            console.log(this.state.id);
            console.log("This is edit user data");
        });

        alert("edit button end clicked");
    }

    // AddData() {
    //     axios.post("http://192.168.43.244:8000/addUserDetails",{
    //         firstname:this.state.firstname,
    //         address: this.state.address,
    //         email: this.state.email,
    //         contact: this.state.contact
        
    //     })
    //     .then((response)=>{
    //         this.setState({
    //             data: response.data,
    //             id: '',
    //             firstname: '',
    //             address: '',
    //             email: '',
    //             contact: ''
    //         });
    //     });
    // }

    UpdateData() {
        axios.post("http://192.168.43.244:8000/updateUserDetails",{
            _id:this.state._id,
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

    handleOk = () => {
        axios.post("http://192.168.43.244:8000/addUserDetails",{
            firstname: this.state.firstname,
            address: this.state.address,
            email: this.state.email,
            contact: this.state.contact
        })
        .then(()=>{
            this.setState({
            visible: false,
            confirmLoading: false,
            firstname: '',
            address: '',
            email: '',
            contact: '',
            value:null
            });
        });
    }


    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
            confirmLoading: false,
            firstname: '',
            address: '',
            email: '',
            contact: '',
            value:null
        });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.firstname]: event.target.value,
            [event.target.address]: event.target.value,
            [event.target.email]: event.target.value,
            [event.target.contact]: event.target.value,
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
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

        const { visible, confirmLoading } = this.state;

        return(
            <div>
                <Card title=" User Details - CRUD Operations ">
                    
                    <Button type="primary" onClick={this.showModal}>Add User Details</Button>
                    
                    <Modal title="Add User Details"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    onSubmit={this.handleInputChange.bind(this)}
                    >

                        <Form onSubmit={this.handleInputChange.bind(this)} style={{backgroundColor:'#f2f2f2', padding:10, marginBottom:10}}>
                            <FormItem {...formItemLayout} label="Name">
                                <Input size="large" placeholder="Name" value={this.state.firstname} onChange={(value) => this.setState({firstname: value.target.value})} onSubmit={this.handleInputChange} style={{width:250}}/>
                            </FormItem>
                            <FormItem {...formItemLayout} label="Address">
                                <Input size="large" placeholder="Address" value={this.state.address} onChange={(value) => this.setState({address: value.target.value})} onSubmit={this.handleInputChange} style={{width:250}}/>
                            </FormItem>
                            <FormItem {...formItemLayout} label="Email">
                                <Input size="large" placeholder="Email" value={this.state.email} onChange={(value) => this.setState({email: value.target.value})} onSubmit={this.handleInputChange} style={{width:250}}/>
                            </FormItem>
                            <FormItem {...formItemLayout} label="Contact">
                                <Input size="large" type="number" placeholder="Contact" value={this.state.contact} onChange={(value) => this.setState({contact: value.target.value})} onSubmit={this.handleInputChange} style={{width:250}}/>
                            </FormItem>

                            <center style={{backgroundColor:'#f2f2f2', padding:10, marginBottom:10}}>
                                {this.state.message}
                            </center>
                        </Form>
                    </Modal>
                </Card>

                <div style={{backgroundColor:'#f2f2f2', padding:10, margin:20}}> 
                    <Card title=" User Details "> 
                    <table>
                        <tbody>  
                            <tr><th><b>S.No</b></th><th><b>NAME</b></th><th><b>ADDRESS</b></th><th><b>EMAIL</b></th><th><b>CONTACT</b></th><th><b>Edit</b></th><th><b>Delete</b></th></tr>  
                            {this.state.user.map((user) => (  
                                <tr key={user._id}>     
                                    <td>{user._id}</td> 
                                    <td>{user.firstname}</td>                        
                                    <td>{user.address}</td>  
                                    <td>{user.email}</td>  
                                    <td>{user.contact}</td>  
                                    <td>   
                                        <Button
                                            type="primary"
                                            style={{width:100, alignItems:'center'}}
                                            onClick={this.editUserdata.bind(this, user._id)}
                                        >
                                            Edit
                                        </Button>
                                    </td>   
                                    <td>   
                                        <Button
                                            type="primary"
                                            style={{width:100, alignItems:'center'}}
                                            onClick={this.DeleteData.bind(this, user._id)}
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
