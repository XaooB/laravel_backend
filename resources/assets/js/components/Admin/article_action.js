import React, { Fragment } from 'react';
import styled from 'styled-components';
import {
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';

const Button = styled.button`
  display:inline-flex;
  justify-content:space-between;
  align-items:center;
  cursor:pointer;
  background:#ee324e;
  outline:none;
  border:1px solid #999;
  border-radius:3px;
  padding:8px 10px;
  svg {
    color:#fff !important;
  }
  &:not(:last-child) {
    margin-right: 6px;
  }
`

const Text = styled.span`
  margin-left:4px;
  display:block;
    color:#fff;
`

const ActionButton = props => {
  return (
    <Button>
      {
        props.name === 'edit'
        ? (
          <Fragment>
            <MdEdit />
            <Text>Edytuj</Text>
          </Fragment>
        ) : (
          <Fragment>
            <MdDeleteForever />
            <Text>Usuń</Text>
          </Fragment>
        )
      }
    </Button>
  )
}

export default ActionButton;
