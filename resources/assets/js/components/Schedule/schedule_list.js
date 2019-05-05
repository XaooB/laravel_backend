import React, { Component } from 'react';
import styled from 'styled-components';
import ScheduleListItem from './schedule_list_item';
import PageHeader from '../Reusable/PageHeader'
import MiniLoader from '../Reusable/mini_loader';
import { connect } from 'react-redux';

const List = styled.section`
  margin-top:30px;
`

class ScheduleList extends Component {
  render() {
    const { matches, filterType } = this.props.user.schedule;

    return (
      <List>
        <PageHeader>Nadchodzące mecze</PageHeader>
        {
          !matches.length ?
          (
            <MiniLoader margin={30} />
          ) : (
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
