import React, { memo } from 'react'

const Header = () => {
    return (
        <div className='header'>
            <div>
                <h1>
                   <span className='navbar-tagline'> Just do it...</span>
                    <div className='navbar-links'>
                        <button className='auth-btn'>
                             <a className="nav-link" href="/login">Login</a>
                        </button>
                        <button className='auth-btn'>
                            <a className="nav-link" href="/register">Signup</a>
                        </button>
                    </div>
                     
            </h1>
            </div>
        </div>
    )
}

export default memo(Header)