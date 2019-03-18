import React, { Fragment } from 'react';
import styled from 'styled-components';
import Wrapper from '../Reusable/wrapper';
import dateConverter from '../../helpers/dateConverter';

const Title = styled.span`
  font-family:'SSPBK';
  display:inline-block;
  font-size:1em;
  font-weight:lighter;
  flex:1;
  text-transform: uppercase;
  color:#c0c0c0;
  text-align:left;
  position:relative;
  &:first-child {
    flex:2;
  }
  &:last-child {
    flex:1.4;
  }
  &:before {
    content:'';
    position:absolute;
    width:30px;
    height:2px;
    bottom:-2px;
    left:0;
    background:#1140a4;
  }
`

const MatchItem = styled.div`
  font-family: 'Bebas';
  font-size:1.2em;
  margin-top:-3px;
  flex:1;
  display:flex;
  flex-flow:row nowrap;
  align-items:center;
  justify-content:space-between;
  padding-bottom:28px;
`

const Date = styled.span`
  flex:1.5;
  margin-right:6px;
`

const TeamName = styled.span`
  margin-left:5px;
`

const Fixture = styled.span`
  flex:3;
  text-align:right;
`

const TeamInfo = styled.div`
  flex:2;
  display:flex;
  align-items:center;
  flex-flow:row nowrap;
  justify-content:flex-start;
`

const Image = styled.img`
  height:20px;
  display:inline-block;
`

const Fixtures = props => {
  const { schedule } = props;

  return (
      <Fragment>
          {
          schedule ?
          (
            schedule.map((item, i) => {
              const { home_team, away_team, league, date, location } = item;
              let teamName = location === 'HOME' ? away_team.short_name : home_team.short_name,
              teamImage = location === 'HOME' ? away_team.image : home_team.image;

            return (
              <MatchItem key={i}>
                <Date>{ dateConverter.toDateOnly(date) }</Date>
                <TeamInfo>
                  <Image src={ teamImage } title={teamName} alt={teamName} />
                  <TeamName>{ teamName }</TeamName>
                </TeamInfo>
                <Fixture>{ league }</Fixture>
              </MatchItem>
              )
            })
          ) : (
            <MatchItem>
              <p>There's no data</p>
            </MatchItem>
          )
      }
      </Fragment>
  )
}

export default Fixtures;
