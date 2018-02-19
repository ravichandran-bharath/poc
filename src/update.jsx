import React, {Component} from 'react';
import axios from 'axios';
import { Form,  Input, Button,  Card } from 'antd';
import 'antd/dist/antd.css';

import { Col, Row, Layout, Form, DatePicker } from 'antd';


const FormItem = Form.Item;

var ID = localStorage._id;


class UpdateAwardDetails extends Component {
        
    constructor(props) {
        
        super(props);
        this.state = { 
            redirect: false,
            id: '',
            name: '',
            address: '',
            email: '',
            contact: '',
            data: []
        }
    }

    componentWillMount() {
        var self = this;
        axios.post("http://192.168.1.103:8000/showUserDetails",{
            ID : this.state._id
        })
        .then(function(response){
            console.log(response.data);
            self.setState({
                data: response.data,

                name: this.state.data.name,
                address: this.state.data.address,
                email: this.state.data.email,
                contact: this.state.data.contact
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

render()    {
    if(this.state.redirect===true){
        return <Redirect path="/salaryDetails" />;
    }
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
            
            <LocaleProvider locale={enUS}>
            <Layout>
            <Head />
            <Layout>
            <Row>
            <Col lg={{span:6}}>
                <Nav />   
            </Col>
            <Col lg={{span: 18}}>
            <Form>
            
            <FormItem {...formItemLayout} label="EMPCD">
                <Input size="large" placeholder="EMPCD" onChange={(value) => this.setState({EMPCD: value.target.value})} value={this.state.data.EMPCD} style={{width:250}}/>
            </FormItem>
            <FormItem {...formItemLayout} label="AWARD DATE">
                <DatePicker onChange={(value) => this.setState({ AWARD_DT: moment(value._d).format("DD-MM-YYYY") })} value={this.state.data.AWARD_DT} />
            </FormItem>
            <FormItem {...formItemLayout} label="AWARD TYPE">
                <Input size="large" placeholder="AWARD TYPE" onChange={(value) => this.setState({AWARD_TYPE: value.target.value})} value={this.state.data.AWARD_TYPE} style={{width:250}}/>
               
            </FormItem>
            <FormItem {...formItemLayout} label="DESCRIPTION">
                <Input size="large" placeholder="DESCRIPTION" onChange={(value) => this.setState({DESCRIPTION: value.target.value})} value={this.state.data.DESCRIPTION} style={{width:250}}/>
               
            </FormItem>
            
            <FormItem {...formItemLayout} label="BEGIN DATE">  
                <DatePicker onChange={(value) => this.setState({ BGTDT: moment(value._d).format("DD-MM-YYYY") })} value={this.state.data.BGTDT} />
            </FormItem>

            <FormItem {...formItemLayout} label="TILL DATE">  
                <DatePicker onChange={(value) => this.setState({ TLDT: moment(value._d).format("DD-MM-YYYY") })} value={this.state.data.TLDT} />
            </FormItem>

            <FormItem {...formItemLayout} label="REMARKS">  
                <Input size="large" placeholder="REMARKS" onChange={(value) => this.setState({Remarks: value.target.value})} value={this.state.data.Remarks} style={{width:250}}/>
            </FormItem>
            
            <FormItem {...formItemLayout} label="SYSID">
                <Input size="large" placeholder="SYSID" onChange={(value) => this.setState({SYSID: value.target.value})} value={this.state.data.SYSID} style={{width:250}}/>
            </FormItem>


                    <Button 
                    type="primary"
                    onClick={this.updateAD.bind(this)}
                    >
                        
                            Save and Proceed
                    </Button>

                    </Form>
                    </Col>
            </Row>
                </Layout>
            </Layout>
            </LocaleProvider>
        );
    }
}

export default UpdateAwardDetails;