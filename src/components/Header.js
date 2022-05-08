import React, { useEffect } from 'react'
import { auth, provider } from "../firebase"
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import {
    selectUserName,
    selectUserPhoto,
    setUserLogin,
    setSignOut
} from "../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"

function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                history.push("/home")
            }
        })
    }, [])

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                let user = result.user
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                history.push("/home")
            })
    }

    const signOut = () => {
        auth.signOut()
            .then(() => {
                dispatch(setSignOut());
                history.push("/")
            })
    }

    return (
        <Nav>
            <Logo src='/images/logo.svg' />
            {!userName ? (
                <LoginContainer>
                    <Login onClick={signIn}>LOGIN</Login>
                </LoginContainer>
            ) :
                <>
                    <NavMenu>
                        <Link to={"/home"}>
                            <img src='/images/home-icon.svg' alt='home icon' />
                            <span>HOME</span>
                        </Link>
                        <a>
                            <img src='/images/search-icon.svg' alt='search icon' />
                            <span>SEARCH</span>
                        </a>
                        <a>
                            <img src='/images/watchlist-icon.svg' alt='watchlist icon' />
                            <span>WATCHLIST</span>
                        </a>
                        <a>
                            <img src='/images/original-icon.svg' alt='star icon' />
                            <span>ORIGINALS</span>
                        </a>
                        <a>
                            <img src='/images/movie-icon.svg' alt='movie reel icon' />
                            <span>MOVIES</span>
                        </a>
                        <a>
                            <img src='/images/series-icon.svg' alt='tv icon' />
                            <span>SERIES</span>
                        </a>
                    </NavMenu>
                    <Signout>
                        <UserImg src={userPhoto} alt={userName}></UserImg>
                        <DropDown onClick={signOut}><span>Sign Out</span></DropDown>
                    </Signout>
                </>
            }
        </Nav>
    )
}

export default Header

const Nav = styled.div`
height: 70px;
background: #090b13;
display: flex;
align-items: center;
padding: 0 36px;
${'' /* overflow-x: hidden; */}
`

const Logo = styled.img`
width: 80px;
`

const NavMenu = styled.div`
display: flex;
flex: 1;
margin-left: 25px;
align-items: center;
a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    img {
        height: 20px;
    }
    span {
        font-size: 13px;
        letter-spacing: 1.42px;
        position: relative;

        &:after {
            content:'';
            height: 2px;
            background: white;
            position: absolute;
            left: 0;
            right: 0;
            bottom: -6px;
            opacity: 0;
            transform-origin: left center;
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            transform: scaleX(0);
        }
    }
    &:hover {
        span:after {
            transform: scaleX(1);
            opacity: 1;
        }
    }
}

@media (max-width: 768px) {
    display: none;
`

const UserImg = styled.img`
height: 48px;
width: 48px;
border-radius: 50%;
`

const Login = styled.div`
border: 1px solid #f9f9f9;
padding: 8px 16px;
border-radius: 4px;
letter-spacing: 1.5px;
background-color: rgba(0, 0, 0, 0.6);
transition: all 0.2s ease 0s;
cursor: pointer;

&:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
}
`

const LoginContainer = styled.div`
flex: 1;
display: flex;
justify-content: flex-end;
`

const DropDown = styled.div`
position: absolute;
top: 48px;
right: 0px;
background: rgb(19, 19, 19);
border: 1px solid rgba(151, 151, 151, 0.34);
border-radius: 4px;
box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px; 
padding: 10px;
font-size: 14px;
letter-spacing: 2px;
width: 100px;
opacity: 0;
cursor: pointer;
transition: all 300ms ease-in-out;
z-index: 1;
text-align: center;
`

const Signout = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: center;

&:hover 
    ${DropDown} {
        opacity: 1;
}

@media (max-width: 768px) {
flex: 1;
display: flex;
justify-content: flex-end;
`