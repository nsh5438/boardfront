import React from 'react';
import {Link} from 'react-router-dom';

const LoginItem = () => {
    return (
        <div>
            <Link to='/user/login' >로그인</Link>
        </div>
    );
};

export default LoginItem;