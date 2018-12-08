import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const Input = styled.input`
  flex:1.9;
  display:block;
  border:none;
  outline:none;
  transition: background .4s;
  background:#ee324e;
  font-weight:lighter;
  height:68px;
  padding:6px 15px;
  color:#ffffff;
  font-size:1.3em;
  &::placeholder {
    color:#ffffff;;
  }
  &:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color:#ffffff;
  }

  &::-ms-input-placeholder { /* Microsoft Edge */
    color:#ffffff;
  }
`

const Search = styled.label`
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:0 10px;
  background:#ee324e;
`

const Exit = styled.label`
  flex:.1;
  display:flex;
  cursor:pointer;
  align-items:center;
  justify-content:center;
  background:#ee324e;
`

const ExitIcon = styled.span`
  font-size:2em;
  position:relative;
  top:-2px;
`

const Wrapper = styled.div`
  position:fixed;
  left:0;
  top:0;
  width:100%;
  display:none;
  flex-flow: row nowrap;
  justify-content:flex-start;
`

const Checkbox = styled.input`
  display:none;
  &:checked ~ ${Wrapper} {
    display:flex;
  }
`


class Searchbar extends Component {
  render() {
    return (
      <Fragment>
        <Search htmlFor='search' name='search'><FaSearch /></Search>
        <Checkbox type='checkbox' htmlFor='search' id='search' />
        <Wrapper>
          <Input placeholder='Search for articles..' type='text' />
          <Exit htmlFor='search' name='search'><ExitIcon>✕</ExitIcon></Exit>
        </Wrapper>
      </Fragment>
    )
  }
}

export default Searchbar;
