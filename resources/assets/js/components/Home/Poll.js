import React, { Component } from 'react';
import styled from 'styled-components';
import PollList from './poll_list';
import PageHeader from '../../components/Reusable/PageHeader'
import { connect } from 'react-redux';
import { setVoteFlagCurrentPoll } from '../../actions/'
import Button from '../Reusable/button';

const Wrapper = styled.div`
  flex:1 1 300px;
  margin:20px 0;
`

const Header = styled.header`
  padding:8px 4px;
  font-size:.9em;
  border-radius: 6px;
  color:#777;
  background: #ededed;
`

const Category = styled.p`
  text-transform: uppercase;
  font-size:.9em;
`

const Topic = styled.p`
  line-height:1.5;
  color:#1e1e1e;
  font-weight:bold;
  margin:15px 5px;
  font-size:.95em;
`

const Title = styled.h4`
  font-family: 'AvenirLTD';
  padding:0 5px;
  text-transform: uppercase;
`

const Form = styled.form`
  display:flex;
  flex-flow:column nowrap;
  color:#1e1e1e;
  margin: 0 5px;
`

const Amount = styled.span`
  display:block;
  font-size:.85em;
  padding:8px 0;
  text-align:center;
`

class StrawPoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
    }

    this.handleSurveyPost = this.handleSurveyPost.bind(this);
  }

  async handleSurveyPost(e) {
    e.preventDefault();
    const { pollAnswer } = this.props.user;
    const { pollData } = this.props;

    //zapytanie musi byc akcją ze względu na zmiane widoku, wiec trzeba przechowywac to w reduksie
    //po sukcesywnym oddaniu glosu zmieniamy flage voted na true, co wymusi zmiane
    this.setState({isFetching: true})
    const request = await axios.post('/api/usersurveyanswers', {idsurvey: pollData.idsurvey, idsurveyset: pollAnswer})

    if(request.status === 200)
      return (
        this.props.setVoteFlagCurrentPoll(),
        this.setState({isFetching: false})
      )
  }

  render() {
    const { user, pollData } = this.props;
    const { isFetching } = this.state;
    const sumAnswerCount =
      pollData.answers
      .map(({answers_count}) => answers_count)
      .reduce((prevValue, currentValue) => prevValue + currentValue);

    return (
      <Wrapper>
        <Header>
          <Title>Ankieta</Title>
        </Header>
        <Topic>{ pollData.topic }</Topic>
        <Form>
          <PollList
            pollData={pollData}
            user={user}
            sumAnswerCount={sumAnswerCount}
          />
          {
            !user.user.length
            ? <div>
                <Amount>Oddanych głosów: {sumAnswerCount}</Amount>
                <Amount>Zaloguj się, aby zagłosować</Amount>
              </div>
            : !pollData.voted
            ? (
              <div style={{display:'flex'}}>
                <Button
                  name='Oddaj głos'
                  onClick={ this.handleSurveyPost }
                  isFetching={ isFetching }
                  fullWidth
                  colorBlue />
              </div>
            ) : (
              <Amount>Oddanych głosów: {sumAnswerCount}</Amount>
            )
          }
        </Form>
      </Wrapper>
    )
  }
}

//after sending a post request on poll answer and calling an action to update vote value in reducer, the component is not rerendering again.
const mapStateToProps = state => {
  return {
    user: state.user,
    pollData: state.user.pollData
  }
}
export default connect(mapStateToProps, {setVoteFlagCurrentPoll})(StrawPoll);
