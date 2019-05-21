import React, { Component } from 'react';
import styled from 'styled-components';


const Container = styled.div`
  display:flex;
  font-family:'Bebas';
  font-size:1.15em;
  justify-content:space-between;
  align-items:center;
  flex-flow: row wrap;
  padding:25px 0;
  &:not(:last-child) {
    border-bottom:1px solid #ededed;
  }
`

const MatchInfo = styled.div`
  display:flex;
  flex:3 1 450px;
  flex-flow:row nowrap;
  justify-content:space-between;
`

const Date = styled.span`
  text-align:center;
  margin-bottom:6px;
  min-width:90px;
  flex:1;
  @media (min-width: 640px) {
    max-width:160px;
    text-align:left;
    margin: 0;
  }
`

const FixtureType = styled.span`
  display:inline-block;
  font-size:.9em;
`

const Type = styled.span`
  font-size:1.15em;
  display:none;
  @media (min-width: 640px) {
    display:block;
  }
`

const Logo = styled.img`
  height:50px;
`

const Fixture = styled.div`
  text-align:center;
  min-width:150px;
  margin:0 10px;
  display:flex;
  flex-flow:column nowrap;
  align-items:center;
`

const TeamName = styled.span`
  text-transform: uppercase;
  margin:0 10px;
  display:none;
  @media (min-width: 640px) {
    display:block;
  }
`

const TeamInfo = styled.div`
  flex:1;
  display:flex;
  flex-flow:row nowrap;
  justify-content:flex-end;
  align-items:center;
  &:last-child {
    justify-content:flex-start;
  }
`

const Sign = styled.span`
  display:inline-block;
  color:#FEBE10;
  font-size:1.1em;
`

class ScheduleListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalId: null,
    }
  }

  componentWillUnmount() {
   clearInterval(this.state.intervalId);
 }

  countdown(scheduledDate) {
    this.intervalId = setInterval(() => {
      let now = new window.Date().getTime();
      let diff = scheduledDate - now;
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + 1;
      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if(diff < 0)
        clearInterval(this.intervalId);

      document.querySelector('.date-countdown').innerHTML = `<span style="color:#ee324e">Pozostało ${days}d ${hours}h ${minutes}m ${seconds}s</span>`
    }, 1000);
  }

  render() {
    const { date, league, type, location, home_team, away_team } = this.props.match;
    const dateTime = new window.Date(date).getTime();
    const currentTime = new window.Date().getTime();

    return (
      <Container>
        <Date className='date-countdown'>
        {
          date.includes('01:00:00') ?
          (
            'TBE'
          ) : (
            ((dateTime - currentTime) > 0 && (dateTime - currentTime) < 174699999) ?
            (
              this.countdown(dateTime)
            ) :
            (
              date
            )
          )
        }
        </Date>
        <MatchInfo>
          <TeamInfo>
            <TeamName>{ home_team.short_name}</TeamName>
            <Logo src={ home_team.image }></Logo>
          </TeamInfo>
            <Fixture>
            <Sign>VS.</Sign>
            <FixtureType>{ league }</FixtureType>
          </Fixture>
          <TeamInfo>
            <Logo src={ away_team.image }></Logo>
            <TeamName>{ away_team.short_name}</TeamName>
          </TeamInfo>
        </MatchInfo>
        <Type>{type}</Type>
      </Container>
    )
  }
}

export default ScheduleListItem;
