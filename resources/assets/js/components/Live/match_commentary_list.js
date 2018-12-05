import React from 'react'
import styled from 'styled-components'

const ListItem = styled.li`
  line-height:1.5;
  padding: 10px;
  display:flex;
  flex-flow:row nowrap;
  justify-content: flex-start;
  align-items:center;
  justify-content: space-between;
  &:nth-child(even) {
    background:#ededed;
  }
`

const Action = styled.span`
  display:inline-block
  min-width:45px;
  color:#ee324e;
  text-align:center;
  padding:0 3px;
  font-family:'AvenirBC';
  &:nth-child(odd) {
    color:inherit;
  }
  & + span {
    text-align:left;
  }
`

const TextWrapper = styled.div`
  flex:10;
`

const ActionCategory = styled.span`
  font-family:'AvenirB';
  font-size:.8em
  display:block;
  color:#ee324e;
  margin-bottom:5px;
`

const ImageWrapper = styled.figure`
  min-width:45px;
  display:flex;
  justify-content:center;
`

const ActionImage = styled.img`
  height:25px;
`

const Text = styled.span`
  display:block;
`

const EventItem = props => {
  return (
    <ListItem>
      { props.rm ?
      <ImageWrapper>
        <ActionImage src='https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg' alt='home team' />
      </ImageWrapper> :
      <ImageWrapper>
        <ActionImage src='https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' alt='away team' />
      </ImageWrapper>
      }
      <Action>18'</Action>
      <Action>GOL</Action>
      <TextWrapper>
        <ActionCategory>BRAMKA</ActionCategory>
        <Text>Barcelona coraz bardziej naciska. Kolejna świetna sytuacja, której nie wykorzystał Messi. Nie jest dobrze. Od 5 minut Real nie miał piłki przy nodze.</Text>
      </TextWrapper>
    </ListItem>
  )
}

export default EventItem;
