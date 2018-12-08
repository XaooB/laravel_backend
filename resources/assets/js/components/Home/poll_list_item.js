import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  font-size:1.05em;
  margin-top:15px;
`

const Input = styled.input`
  display:none;
  &:checked ~label:after {
    content:"✔";
    z-index:1;
    position:absolute;
    color:white;
    font-size:.9em;
    left:0;
    top:-3px;
    width:22px;
    height:22px;
    text-align:center;
    border-radius:2px;
    border:2px solid #00529f;
    background:#00529f;
  }
`

const Label = styled.label`
  display:block;
  cursor:pointer;
  position:relative;
  padding-left:35px;
  &:before {
    content:'';
    position:absolute;
    left:0;
    top:-3px;
    width:22px;
    height:22px;
    border:2px solid #e1e1e1;
    border-radius:2px;
  }
`

const PollListItem = props => {
  const { answer, id_survey_set } = props.data;
  return (
    <ListItem>
      <Input type='radio' id={ id_survey_set }  name='ans' />
      <Label htmlFor={ id_survey_set }>{ answer }</Label>
    </ListItem>
  )
}

export default PollListItem;
