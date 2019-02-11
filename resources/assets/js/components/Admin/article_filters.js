import React from 'react';
import styled from 'styled-components';
import Title from './admin_content_title';
import Button from '../Reusable/button';
import Wrapper from '../Reusable/wrapper';

const Select = styled.select`
  padding:10px;
  border-radius:3px;
  outline: none;
  align-self:flex-start;
`

const Search = styled.input`
  align-self:flex-end;
  padding:10px;
  border-radius:3px;
  outline: none;
  border:1px solid rgb(169,169,169);
`

const ArticleFilters = props => {
  return (
    <Wrapper>
      <Select>
        <option>25</option>
        <option>50</option>
        <option>100</option>
        <option>&infin;</option>
      </Select>
      <Search type='search' placeholder='Szukaj..'/>
    </Wrapper>
  );
};

export default ArticleFilters;
