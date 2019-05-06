import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.span`
  display:inline-block;
  margin:2px;
  border-radius:6px;
  cursor:pointer;
  line-height:1;
  padding:8px;
  font-size:.95em;
  background:#00529f;
  color:#fff;
  &:hover {
    color:#FEBE10;
  }
`

const CategoryList = props => {
  const { item, setCategory } = props;

  return (
    <Wrapper onClick={ setCategory() } data-id={item.idcategory} data-name={item.name}> {item.name}</Wrapper>
  )
}

export default CategoryList;
