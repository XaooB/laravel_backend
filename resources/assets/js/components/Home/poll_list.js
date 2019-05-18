import React from 'react';
import styled from 'styled-components';
import PollListQuestion from './poll_list_question';
import PollListResult from './poll_list_result';

const List = styled.ul`
  list-style-type: none;
  margin-bottom:18px;
`

const PollList = props => {
  const { user, pollData, sumAnswerCount } = props;

  return (
    !user.user.length
    ? <List>
        {
          pollData.answers.map(
          item => {
            return <PollListResult
              key={ item.idsurveyset }
              data={ item }
              amount={ sumAnswerCount } />
            }
          )
        }
      </List>
    : !pollData.voted
    ? <List>
      {
        pollData.answers.map(
        item => {
          return <PollListQuestion
            key={ item.idsurveyset }
            data={ item } />
          }
        )
      }
    </List>
    : <List>
      {
        pollData.answers.map(
        item => {
          return <PollListResult
            key={ item.idsurveyset }
            data={ item }
            amount={ sumAnswerCount } />
          }
        )
      }
    </List>
  )
}

export default PollList;
