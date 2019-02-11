import React from 'react';
import styled from 'styled-components';
import LastWeekStats from './admin_last_week_stats';
import Wrapper from '../Reusable/wrapper';
import Title from './admin_content_title';
import Categories from './admin_categories';
import FullStats from './admin_fullStats';

const Container = styled.section`
  margin-left:1px;
  margin:20px;
  margin-top:5px;
  align-items:center;
  svg {
    color:#c6c6c6;
    font-size:1.25em;
    font-family: 'SSPL';
  }
`

const Content = props => {
  return (
    <Container>
      <LastWeekStats />
      <section>
        <Title>podstawowe informacje</Title>
        <Wrapper>
          <Categories />
          <FullStats />
        </Wrapper>
      </section>
    </Container>
  );
};

export default Content;
