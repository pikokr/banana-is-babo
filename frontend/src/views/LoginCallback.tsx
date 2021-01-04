import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const LoginCallback = () => {
    return (
        <div className="text-center pt-10">
            <FontAwesomeIcon size="9x" icon={['fab', 'discord']}/>
            <div className="text-2xl">로그인 처리중입니다...</div>
        </div>
    );
};

export default LoginCallback;