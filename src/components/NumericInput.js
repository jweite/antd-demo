// Derived from https://ant.design/components/input/ example

import React from 'react';
import { Input } from 'antd';

export class NumericInput extends React.Component {
  constructor(props) {
		super(props);
		this.state = { value: props.value }
  }
	
  onChange = (e) => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
		this.setState({value: value});
    }
  }
  
  onBlur = () => {
    const onBlur = this.props.onBlur;
    if (onBlur) {
      onBlur(this.state.value);
    }
  }
  
  render() {
    return (
        <Input
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          maxLength="25"
        />
    );
  }
}
