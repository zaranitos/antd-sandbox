import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    console.log('handleConfirmBlur triggered');
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  // compareToFirstPassword = (rule, value, callback) => {
  //   const form = this.props.form;
  //   if (value && value !== form.getFieldValue('email')) {
  //     callback('Two email that you enter is inconsistent!');
  //   } else {
  //     callback();
  //   }
  // }

  // validateToNextPassword = (rule, value, callback) => {
  //   console.log('validateToNextPassword triggered');
  //   const form = this.props.form;
  //   form.validateFields(['confirmEmail'], { force: true });
  //   callback();
  // }

  handleEmailChange = (rule, value, callback) => {
    console.log('handleEmailChange invoked');
    const form = this.props.form;
    form.validateFields(['RepeatEmail'], { force: true });
    callback();
  };

  handleRepeatEmailChange = (rule, value, callback) => {
    console.log('handleRepeatEmailChange invoked');
    const form = this.props.form;
    if (value && value !== form.getFieldValue('email')) {
      console.log('Setting error');
      callback('E-post matcher ikke');
    } else {
      console.log('Setting OK');
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Email"
        >
          {getFieldDecorator('email', {
            validateTrigger: 'onBlur',
            rules: [{
              required: true, message: 'Please input your email!',
            }, {
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              validator: this.handleEmailChange,
            }],
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm email"
        >
          {getFieldDecorator('RepeatEmail', {
            rules: [{
              required: true, message: 'Please confirm your email!',
            }, {
              validator: this.handleRepeatEmailChange,
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

ReactDOM.render(<WrappedRegistrationForm />, document.getElementById('root'));