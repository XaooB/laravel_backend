import React, { Component } from 'react';
import styled from 'styled-components';
import MiniLoader from '../Reusable/mini_loader';
import { makeWidthFlexible, RadialChart } from 'react-vis';
import ReactChartkick, { PieChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

const FlexWrapper = styled.div`
  display:flex;
  align-items:center;
  flex:1;
  justify-content:space-between;
  flex-flow: row wrap;
  margin:0 20px;
  background:#fff;
  padding:15px 0;
`

const fakeData = [
  ['liga mistrzów', 12],
  ['liga hiszpańska', 45],
  ['kontrakty', 7],
  ['transfery', 12],
  ['puchar króla', 4],
  ['inne', 9]
]

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const requestCategories = await fetch('/api/categories');
    const categories = await requestCategories.json();

    this.setState({
      categories
    })
  }

  render() {
    const { categories } = this.state;

    return (
      <FlexWrapper>
        {
          categories ?
          (
            <PieChart
              data={fakeData}
            />
          ) : (
            <MiniLoader margin={20} />
          )
        }

      </FlexWrapper>
    )
  }
}

export default Categories;
