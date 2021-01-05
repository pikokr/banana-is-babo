import React from 'react';
import {useQuery} from "@apollo/client";
import {gql} from "@apollo/client/core";
import ClickAwayHandler from "./ClickAwayHandler";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from "clsx";

const Layout = ({children}: {children: React.ReactNode}) => {
    const [userDropdown, setUserDropdownOpen] = React.useState(false)

    const {loading, data} = useQuery(gql`
        query {
            me {
                id
                username
                discriminator
                avatar
            }
            login
        }
    `)

    const user = data?.me

    return (
        <div>
            <div className="flex justify-between items-center border-b-2 border-gray-100 p-4 md:px-10 lg:px-60" style={{alignItems: 'center'}}>
                <div className="flex justify-start">
                    <a href="/">
                        <span className="text-3xl">BANANA</span>
                    </a>
                </div>
                <div className="flex justify-end">
                    {
                        loading ? 'Loading....' : data && user ? (
                            <ClickAwayHandler handle={() => setUserDropdownOpen(false)}>
                                <div className="relative">
                                    <a href="#" onClick={e => {
                                        e.preventDefault()
                                        setUserDropdownOpen(!userDropdown)
                                    }} className="text-center justify-center border-transparent flex" style={{alignItems: 'center'}}>
                                        <img className="h-8 rounded-full mr-2 w-8" src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}` : `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png`} alt="avatar"/>
                                        {user.username}#{user.discriminator}
                                        <FontAwesomeIcon icon={['fas', 'angle-down']} className={clsx('transition-transform', 'ml-2', {
                                            'fa-rotate-180': userDropdown
                                        })}/>
                                    </a>
                                    <div className={
                                        clsx('absolute rounded-md shadow-lg ring-1 w-full mt-2 ring-opacity-5 ring-2 ring-black bg-white transition-all flex', {
                                            'opacity-0': !userDropdown,
                                            'opacity-100': userDropdown,
                                            'mt-5': !userDropdown,
                                            'mt-0': userDropdown,
                                            'pointer-events-none': !userDropdown
                                        })
                                    } onClick={() => setUserDropdownOpen(false)}>
                                        <a href="#" className="w-full p-2" onClick={e => {
                                            e.preventDefault()
                                            localStorage.removeItem('token')
                                            window.location.reload()
                                        }}>
                                            로그아웃
                                        </a>
                                    </div>
                                </div>
                            </ClickAwayHandler>
                        ) : <a href={data?.login} className="text-center justify-center px-4 py-2 border-transparent rounded-md bg-indigo-600 text-white">
                            로그인
                        </a>
                    }
                </div>
            </div>
            {children}
        </div>
    );
};

export default Layout;