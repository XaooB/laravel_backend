import React from 'react'
import styled from 'styled-components'
import EventItem from './match_commentary_list';
import Button from '../Reusable/button';

const Wrapper = styled.section`
  margin-bottom:30px;
  cursor:default;
`

const Title = styled.h2`
  font-size:1.1em;
  font-family:'SSPB';
  text-transform: uppercase;
`

const Status = styled.span`
  display:block;
  color:#ee324e;
  font-size:1.1em;
  font-family:'SSPBK';
`

const CommentaryInfo = styled.div`
  padding:0 0 10px;
  border-bottom:1px solid #e0e0e0;
  display:flex;
  flex-flow:row nowrap;
  justify-content:space-between;
`

const List = styled.ul`
  list-style-type: none;
`

const ButtonWrapper = styled.div`
  display:flex;
  margin:20px 0;
`

const Commentary = props => {
  return (
    <Wrapper>
      <CommentaryInfo>
        <Title>Live commentary</Title>
        <Status>LIVE – 87'</Status>
      </CommentaryInfo>
      <List>
        <EventItem team='RMD' rm />
        <EventItem team='RMD' rm />
        <EventItem team='FCB' />
        <EventItem team='RMD' rm />
        <EventItem team='FCB' />
        <EventItem team='FCB' />
      </List>
      <ButtonWrapper>
        <Button name='Show more' fullWidth colorBlue />
      </ButtonWrapper>
    </Wrapper>
  )
}

export default Commentary;
