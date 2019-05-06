import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { IoMdLogIn, IoMdArrowDropdown } from "react-icons/io";
import { withRouter } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';
import LoggedUserNav from './logged_user_nav';
import LoginOptions from './login_options';

const Background = styled.section`
  width:100%;
  padding:5px 10px;
  border-bottom:1px solid #ededed;
`

const Wrapper = styled.div`
  display:flex;
  flex-flow: row nowrap;
  justify-content:flex-end;
  flex:1;
  @media (min-width: 640px) {
    flex:none;
  }
`

const Container = styled.div`
  max-width:1300px;
  margin:0 auto;
  display:flex;
  font-family: 'AvenirLTR';
  align-items:center;
  justify-content:flex-end;
  @media (min-width: 640px) {
    justify-content:space-between;
  }
`


const LogIn = styled.a`
  display:flex;
  align-items:center;
  justify-content:space-between;
  min-width:125px;
  cursor:pointer;
  padding:4px 15px;
  background: #00529f;
  border-radius:20px;
  margin-left:5px;
  text-transform:uppercase;
  svg {
    font-size:17px;
    margin-right:5px;
  }
`

const LogInText = styled.span`
  display:block;
  line-height:1;
  white-space:nowrap;
  font-size:11px;
  letter-spacing:.5px;
  font-family:'AvenirLTD';
`

const Text = styled.span`
  display:none;
  color:#777;
  font-size:.85em;
  font-family: "Arial";
  @media (min-width: 640px) {
    display:block;
  }
`

const SearchIcon = styled.label`
  font-size:12px;
  border-radius:20px;
  background: #00529f;
  color:#fff;
  height:32px;
  width:32px;
  cursor:pointer;
  position:relative;
  z-index:9;
  display:flex;
  justify-content:center;
  align-items:center;
`

const SearchBar = styled.form`
  width:100%;
  display:flex;
  justify-content:flex-end;
  align-items:center;
  position:relative;
`

const UserSection = styled.div`
  position:relative;
  display:flex;
  align-items:initial;
`

const LoggedIn = styled.div`
  display:none;
  margin-left:6px;
  padding:4px 12px;
  padding-left:15px;
  cursor:pointer;
  align-items:center;
  color:#fff;
  background: #00529f;
  border-radius:20px;
  svg {
    font-size:12px;
  }
  @media (min-width: 640px) {
    display:flex;
  }
`

const User = styled.span`
  text-transform:uppercase;
  font-size:11px;
  letter-spacing:.5px;
  white-space: nowrap;
`

const SearchInput = styled.input`
  position:absolute;
  width:32px;
  right:0px;
  color:#fff;
  padding-left:0px;
  padding-right:0px;
  height:32px;
  border:none;
  outline:none;
  background: #00529f;
  border-radius:20px;
  font-size:12px;
  transition: .3s all ease-in;
  &::placeholder {
    color:#fff;
  }
`

const LoginButton = styled.div`

`

const Checkbox = styled.input`
  display:none;
  &:checked ~ ${SearchInput} {
    width:100%;
    padding-left:15px;
    padding-right:48px;
    @media (min-width: 640px) {
      width:250px;
    }
  }
  &:checked ~ ${SearchIcon} {
    border-top-left-radius:0;
    border-bottom-left-radius:0;
    padding:2px;
    border-left:2px solid #fff;
  }
`

class HeaderLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      keyword: '',
      showUserNav: false,
    }
  }

  openUserNav() {
    const { showNav } = this.state;
    this.setState({showNav: !showNav})
  }

  submitForm(e) {
    e.preventDefault();
    const { keyword } = this.state;
		this.props.history.push(`/app/search/${ keyword }`);
	}

  handleSearch(e) {
    this.setState({
      keyword: e.target.value
    })
  }

  render() {
    const { user } = this.props.user;
    const { keyword, showNav } = this.state;

    return (
      <Background>
        <Container>
          <Text>Fanowska strona poświęcona hiszpańskiemu klubowi – <b>Real Madryt C.F.</b></Text>
          <Wrapper>
            <SearchBar
              onSubmit={ e => this.submitForm(e) }>
              <Checkbox type='checkbox' id='search' />
              <SearchInput
                type='text'
                placeholder='Szukaj..'
                value={ keyword }
                onChange={ e => this.handleSearch(e) }/>
              <SearchIcon htmlFor='search' >
                <FaSearch />
              </SearchIcon>
            </SearchBar>
            {
              !user.length ?
              (
                <UserSection>
                  <LogIn onClick={ () => this.openUserNav() }>
                    <IoMdLogIn />
                    <LogInText>zaloguj się</LogInText>
                  </LogIn>
                {
                  showNav ?
                  (
                    <LoginOptions closeNav={ () => this.openUserNav() } user={user} />
                  ) :
                  ''
                }
                </UserSection>

              ) : (
                <UserSection>
                  <LoggedIn onClick={ () => this.openUserNav() }>
                    <User>{ user[0].name }</User>
                    <IoMdArrowDropdown />
                  </LoggedIn>
                  {
                    showNav ?
                    (
                      <LoggedUserNav closeNav={ () => this.openUserNav() } user={user} />
                    ) :
                    ''
                  }
                </UserSection>
              )
            }
          </Wrapper>
        </Container>
      </Background>
    )
  }
}

const mapStateToProps = ({user}) => ({user});
export default withRouter(connect(mapStateToProps)(HeaderLogin));