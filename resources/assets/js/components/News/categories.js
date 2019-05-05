import React from 'react';
import styled from 'styled-components';
import MiniLoader from '../Reusable/mini_loader';
import PageHeader from '../Reusable/PageHeader';
import CategoriesList from './categories_list';

const Container = styled.section`
  width:100%;
  order:1;
  @media (min-width: 820px) {
    order:2;
    width:27%;
    padding-left:20px;
  }
`

const Information = styled.p`
  padding:10px 0;
`

const Categories = props => {
  return (
    <Container>
      <PageHeader>Kategorie</PageHeader>
      <CategoriesList />
    </Container>
  )
}

export default Categories;
