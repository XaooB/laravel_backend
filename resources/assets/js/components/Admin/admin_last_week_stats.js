import React, { Component } from 'react';
import styled from 'styled-components';
import Title from './admin_content_title';
import Visits from './admin_visits';
import LastWeekStatsItem from './admin_last_week_stats_item';

const FlexWrapper = styled.div`
  display:flex;
  justify-content:space-between;
  flex-flow: row wrap;
  align-items:flex-start;
`

const fakeData = [
  {
    id: 1,
    stats: {
      name: 'użytkowników',
      count: 23,
      oldcount: 10,
    },
    data: [
      {
        username: 'Bartosz Lorek',
        email: 'balorek19@gmail.com',
        image: 'https://lh3.googleusercontent.com/-uXU0wIXpYfA/AAAAAAAAAAI/AAAAAAAAUvk/wY7ktnZaRUA/photo.jpg?sz=100',
        added: '12 minut temu',
      },
      {
        username: 'Marcin Murach',
        email: 'murach_marcin95@gmail.com',
        added: '3 godziny temu',
        image: 'https://i.imgur.com/rJ14mVy.jpg',
      },
      {
        username: 'XaooTester',
        email: 'tester_portal@gmail.com',
        added: '17 godzin temu',
        image: 'https://lh5.googleusercontent.com/-fLBDju0SVkY/AAAAAAAAAAI/AAAAAAAAAAA/APUIFaMeKnTJAGZw24GnYq0tw4hbqdFDPQ/mo/photo.jpg?sz=100',
      },
    ],
    charts: {
      1: 2,
      2: 1,
      3: 4,
      4: 8,
      5: 6,
      6: 1,
      7: 2,
    }
  },
  {
    id: 2,
    stats: {
      name: 'artykułów',
      count: 80,
      oldcount: 80,
    },
    data: [
      {
        username: 'Kick off times for LaLiga matchday 15',
        email: '3 godziny temu',
        image: 'http://res.cloudinary.com/hhidlawm6/image/upload/c_fit,h_400,w_940/v1/articles/articles711544215986.png',
      },
      {
        username: 'Real Madrid begin to prepare for the match against Huesca',
        email: '4 godziny temu',
        image: 'http://res.cloudinary.com/hhidlawm6/image/upload/c_fit,h_1530,w_1500/v1/articles/articles611544203024.png',
      },
      {
        username: 'Real wygrywa Champions League',
        email: '7 godzin temu',
        image: 'http://res.cloudinary.com/hhidlawm6/image/upload/c_fit,h_720,w_1280/v1/articles/articles401544200795.png',
      },
    ],
    charts: {
      1: 7,
      2: 9,
      3: 11,
      4: 4,
      5: 15,
      6: 9,
      7: 22,
    }
  },
  {
    id: 3,
    stats: {
      name: 'komentarzy',
      count: 124,
      oldcount: 354,
    },
    data: [
      {
        username: 'Bartosz Lorek',
        email: '2 minuty temu',
        article: 'Real wygrywa Champions League',
        image: 'https://lh3.googleusercontent.com/-uXU0wIXpYfA/AAAAAAAAAAI/AAAAAAAAUvk/wY7ktnZaRUA/photo.jpg?sz=100',
      },
      {
        username: 'XaooTester',
        email: '4 minut temu',
        article: 'Real wygrywa Champions League',
        image: 'https://lh5.googleusercontent.com/-fLBDju0SVkY/AAAAAAAAAAI/AAAAAAAAAAA/APUIFaMeKnTJAGZw24GnYq0tw4hbqdFDPQ/mo/photo.jpg?sz=100',
      },
      {
        username: 'XaooTester',
        email: '5 minut temu',
        article: 'Kick off times for LaLiga matchday 15',
        image: 'https://lh5.googleusercontent.com/-fLBDju0SVkY/AAAAAAAAAAI/AAAAAAAAAAA/APUIFaMeKnTJAGZw24GnYq0tw4hbqdFDPQ/mo/photo.jpg?sz=100',
      },
    ],
    charts: {
      1: 34,
      2: 22,
      3: 64,
      4: 11,
      5: 47,
      6: 56,
      7: 115,
    }
  }
];

class LastWeekStats extends Component {
  render() {
    return (
      <div>
        <Title>ostatni tydzień</Title>
        <Visits />
        <FlexWrapper>
          {
            fakeData.map((item) => {
              return <LastWeekStatsItem data={ item } key={item.id} />
            })
          }
        </FlexWrapper>
      </div>
    )
  }
}

export default LastWeekStats;
