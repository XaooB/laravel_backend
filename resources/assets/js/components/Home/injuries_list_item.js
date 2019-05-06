import React from 'react';
import styled from 'styled-components';
import dateConverter from '../../helpers/dateConverter';
import Wrapper from '../Reusable/wrapper';

const Category = styled.p`
  text-transform: uppercase;
  font-size:.9em;
`

const Header = styled.header`
  padding:8px 4px;
  font-size:.9em;
  border-radius: 6px;
  color:#777;
  background: #ededed;
`

const Title = styled.h4`
  font-family: 'AvenirLTD';
  padding:0 5px;
  text-transform: uppercase;
`

const Content = styled.div`
  display:flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-top:18px;
  color:#1e1e1e;
`

const PlayerInfo = styled.div`
  margin-left:10px;
  font-size:.9em;
  margin-bottom:12px;
  > p:not(:last-child) {
    margin-bottom:3px;
  }
`

const ImageWrapper = styled.figure`
  width:40px;
  height:40px;
  overflow:hidden;
  display:flex;
  justify-content:center;
`

const Image = styled.img`
  height:40px;
`

const InjuriesListItem = props => {
  const { data } = props;
  const { player } = data;

  return (
    <Wrapper>
      <ImageWrapper>
        <Image src='/images/default_icon.png' title={player.name} alt={player.name} />
      </ImageWrapper>
      <PlayerInfo>
        <p><b>Piłkarz:</b> {player.name}</p>
        <p><b>Powód:</b> {data.type}</p>
        <p><b>Data powrotu:</b> {dateConverter.toDateOnly(new Date(data.return_date))}</p>
      </PlayerInfo>
    </Wrapper>
  )
}

export default InjuriesListItem;
