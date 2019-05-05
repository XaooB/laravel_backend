import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.section`
  display:flex;
  align-items:center;
  flex-flow: row wrap;
  justify-content:center;
  width:100%;
  height:320px;
  position:relative;
  margin-bottom:10px;
  background: url('/img/match_bg2.png') no-repeat;
  &:before {
    content:'';
    width:100%;
    height:100%;
    background-color:#00529f;
    mix-blend-mode: overlay;
    position:absolute;
    left:0;
    top:0;
  }
`

const MatchWrapper = styled.div`
  display:flex;
  flex-flow:row nowrap;
  align-items:center;
`

const TeamName = styled.span`
  margin-top:20px;
  font-family:'Bebas';
  font-size:3em;
  line-height:.9;
`

const MatchInfo = styled.div`
  min-width:170px;
  margin-left:30px;
  margin-right:30px;
  margin-top:-20px;
  > span {
    display:block;
    text-align:center;
  }
`

const FixtureName = styled.span`
  font-size: 1.2em;
  font-family:'AvenirLTB';
`

const Date = styled.span`
  font-size:.8em;
  font-family:'AvenirLTD';
  margin:2px 0 4px 0;
`

const Result = styled.span`
  margin-top:12px;
  font-size:4em;
  color:#FEBE10;
  font-family:'Bebas';
  line-height:.9;;
`

const Location = styled.span`
  display:block;
  text-align:center;
  font-size:.8em;
  text-transform: uppercase;
  margin-top:6px;
  font-family:"AvenirLTD";
`

const Text = styled.span`
  display:block;
  margin-bottom:30px;
  font-size:1.6em;
  font-family:"Bebas";
`

const ImageWrapper = styled.figure`
  margin:0 30px;
`

const Image = styled.img`
  height:100px;
`

const Team = styled.div`
  display:flex;
  flex-flow:column wrap;
  justify-content:space-between;
  align-items:center;
`

const NextMatch = props => {
  const { away_team, home_team, date, league, location } = props.data;
  return (
    <Section>
        <Team>
          <ImageWrapper>
            <Image src={home_team.image}/>
          </ImageWrapper>
          <TeamName>{home_team.short_name}</TeamName>
        </Team>
        <MatchInfo>
          <Text>Najbliższy mecz</Text>
          <FixtureName>{league}</FixtureName>
          <Date>{date}</Date>
          <Result>vs.</Result>
          <Location>{location === 'HOME' ? 'mecz u siebie' : 'mecz na wyjeździe' }</Location>
        </MatchInfo>
        <Team>
          <ImageWrapper>
            <Image src={away_team.image}/>
          </ImageWrapper>
          <TeamName>{away_team.short_name}</TeamName>
        </Team>
    </Section>
  )
}

export default NextMatch;
