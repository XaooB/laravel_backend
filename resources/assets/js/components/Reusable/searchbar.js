import React, { Component } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding:5px 10px;
  border:none;
  outline:none;
  color:#fff;
  min-width:300px;
  border-bottom:1px solid #ee324e;
  margin-right:20px;
  transition: background .3s;
  &:active, &:focus {
    ${Input} {
      &::placeholder {
          color:#fff;
      }
    }
    transition: background .3s;
    background: #ee324e;
  }
  &::placeholder {
    color:#1e1e1e;
  }
  &:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color:white;
  }

  &::-ms-input-placeholder { /* Microsoft Edge */
    color:white;
  }
`

class Searchbar extends Component {
  render() {
    return (
      <Input placeholder='Search for articles..' type='search' />
    )
  }
}

export default Searchbar;
