import React, { Component } from 'react';
import styled from 'styled-components';
import FullStatsItem from './admin_fullStats_item';

const FlexWrapper = styled.div`
  display:flex;
  align-self:flex-start;
  flex:1.75;
  justify-content:space-between;
  flex-flow: row wrap;
`

class FullStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {

  }
  render() {
    return (
      <FlexWrapper>
        <FullStatsItem amount='67' name='użytkowników' />
        <FullStatsItem amount='143' name='artykułów' />
        <FullStatsItem amount='464' name='komentarzy' />
      </FlexWrapper>
    )
  }
}

export default FullStats;
