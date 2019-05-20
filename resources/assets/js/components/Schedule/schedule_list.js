import React, { Component } from 'react';
import styled from 'styled-components';
import ScheduleListItem from './schedule_list_item';
import PageHeader from '../Reusable/PageHeader'
import MiniLoader from '../Reusable/mini_loader';
import { connect } from 'react-redux';

const List = styled.section`
  margin-top:30px;
`

const Information = styled.p`
  margin-top:20px;
  font-size:1.1.em;
`

class ScheduleList extends Component {
  render() {
    const { matches, filterType, status } = this.props.user.schedule;

    return (
      <List>
        <PageHeader>Nadchodzące mecze</PageHeader>
        {

          status
          ? <MiniLoader margin={30} />
          : !matches.length
          ? <Information>Brak nadchodzących meczów.</Information>
          : (
            matches
              .filter(item => {
                if(filterType !== 'All') {
                  if(item.league === filterType) return item;
                } else {
                  return item;
                }
              })
              .map(item => {
                return <ScheduleListItem match={ item } key={`${item.date} + ${item.away_team.short_name}`}/>
              })
          )


        }
      </List>
    )
  }
}


const mapStateToProps = ({user}) => ({user});
export default connect(mapStateToProps)(ScheduleList);
