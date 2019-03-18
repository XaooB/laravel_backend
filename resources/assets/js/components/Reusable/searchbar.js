import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import Button from './button';
import { API } from '../../helpers/api';

const Input = styled.input`
  flex:1.9;
  display:block;
  border:none;
  outline:none;
  transition: background .4s;
  background:#ee324e;
  font-family: 'SSPL';
  height:68px;
  padding:6px 15px;
  color:#ffffff;
  font-size:1.3em;
  &::placeholder {
    color:#ffffff;;
  }
  &:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color:#ffffff;
  }

  &::-ms-input-placeholder { /* Microsoft Edge */
    color:#ffffff;
  }
`

const Search = styled.label`
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:0 10px;
  color:#ee324e;
`

const Exit = styled.label`
  flex:.1;
  display:flex;
  cursor:pointer;
  align-items:center;
  justify-content:center;
  background:#ee324e;
`

const ExitIcon = styled.span`
  font-size:2em;
  position:relative;
  top:-2px;
  &:hover {
    color:#000;
  }
`

const Wrapper = styled.div`
  position:fixed;
  background:white;
  left:0;
  z-index:999;
  top:0;
  width:100%;
  display:none;
  flex-flow: column nowrap;
  justify-content:center;
  border-bottom:1px solid #ededed;
`

const Row = styled.div`
  display:flex;
  flex-flow: row nowrap;
  justify-content:space-between;
  &:last-child {
    padding: 0 10px;
    justify-content:center;
  }
`

const Checkbox = styled.input`
  display:none;
  &:checked ~ ${Wrapper} {
    display:flex;
  }
`

const SearchItem = styled.article`
  display:flex;
  color:#333;
  flex-flow:column nowrap;
  max-width:200px;
  margin:25px 10px;
  overflow:hidden;
`

const SearchItemTitle = styled.h3`
  font-family: 'SSPB';
`

const ImageWrapper = styled.figure`
  height:130px;
  display:flex;
  overflow:hidden;
  justify-content:center;
  align-items:center;
  margin-bottom:7px;
`

const Image = styled.img`
  height:160px;
`

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      articles: '',
    };

    this.searchFor = this.searchFor.bind(this);
  };

  searchFor(e) {
    this.setState({
      term: e.target.value,
    }, async prevState => {
      const request = await API.get(`articles_filtrate/5/${this.state.term}`);
      await this.setState({ articles: request });
      console.log(request);
    });
  }

  render() {
    const { trem } = this.state;
    return (
      <Fragment>
        <Search htmlFor='search' name='search'><FaSearch /></Search>
        <Checkbox type='checkbox' htmlFor='search' id='search' />
        <Wrapper>
          <Row>
            <Input placeholder='Szukaj artykułów..' type='text' value={trem} onChange={this.searchFor} />
            <Exit htmlFor='search' name='search'><ExitIcon>✕</ExitIcon></Exit>
          </Row>
          <div style={{ display:'flex', flexFlow: 'column nowrap', justifyContent: 'center', marginBottom:20 }}>
            <Row style={{ display:'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
              <SearchItem>
              <ImageWrapper>
              <Image src='http://res.cloudinary.com/hhidlawm6/image/upload/c_fit,h_720,w_1280/v1/articles/articles291544196036.png' />
              </ImageWrapper>
              <SearchItemTitle>Real Madryt wygrywa ligę mistrzów 2018/2019</SearchItemTitle>
              </SearchItem>
              <SearchItem>
              <ImageWrapper>
              <Image src='https://res.cloudinary.com/hhidlawm6/image/upload/v1544201300/articles/default.jpg' />
              </ImageWrapper>
              <SearchItemTitle>Real Madryt zalicza fatalny początek sezonu</SearchItemTitle>
              </SearchItem>
              <SearchItem>
              <ImageWrapper>
              <Image src='https://www.realmadrid.com/img/horizontal_940px/_1am2709_20190119065540.jpg' />
              </ImageWrapper>
              <SearchItemTitle>Sergio Ramos z największą ilością wygranych piłek</SearchItemTitle>
              </SearchItem>
              <SearchItem>
              <ImageWrapper>
              <Image src='http://res.cloudinary.com/hhidlawm6/image/upload/c_fit,h_400,w_940/v1/articles/articles711544215986.png' />
              </ImageWrapper>
              <SearchItemTitle>Isco ma coraz większe problemy z trenerm</SearchItemTitle>
              </SearchItem>
              <SearchItem>
              <ImageWrapper>
              <Image src='https://www.realmadrid.com/img/horizontal_940px/solari-rueda-de-prensa_20190119074540.jpg' />
              </ImageWrapper>
              <SearchItemTitle>Solari: będziemy walczyć do końca</SearchItemTitle>
              </SearchItem>
            </Row>
            <Button name='Pokaż więcej' colorBlue />
          </div>
        </Wrapper>
      </Fragment>
    )
  }
}

export default Searchbar;
