import React, {Component} from 'react';
import axios from 'axios';
import { Modal, Button, Input, Form } from 'antd';


const FormItem = Form.Item;


class Update extends Component {
        
    constructor(props) {
        super(props);
        this.state = {

            visible: false,
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

    showUpdate() {
        alert("edit button initial clicked");
        this.setState({
            visible: true
        });
        axios.get("http://127.0.0.1:8000/showEditUserDetails",{
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

    handleOk = () => {
        axios.post("http://192.168.43.244:8000/updateUserDetails",{
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

    render()    {

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
                <Button type="primary" onClick={this.showUpdate.bind(this)}>Edit</Button>

                    <Modal title="Edit User Details"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    onSubmit={this.handleInputChange.bind(this)}
                    >
                        <Form onSubmit={this.handleInputChange.bind(this)} style={{backgroundColor:'#f2f2f2', padding:10, marginBottom:10}}>
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
                        </Form>
                    </Modal>
            </div>
        );
    }
}

export default Update;