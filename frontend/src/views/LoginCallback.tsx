import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Apollo from "../Apollo";
import {gql} from "@apollo/client/core";

const LoginCallback = () => {
    const [initial, setInitial] = React.useState(true)
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (!code) {
        window.location.assign('/')
        return null
    }

    if (initial) {
        setInitial(false);
        (async () => {
            const {data} = await Apollo.mutate({
                mutation: gql`
                mutation($code: String!) {
                    login(code: $code)
                }
                `,
                variables: {
                    code
                }
            })
            if (data?.login) {
                localStorage.setItem('token', data.login)
            }
            window.location.assign('/')
        })()
    }
    return (
        <div className="text-center pt-10">
            <FontAwesomeIcon size="9x" icon={['fab', 'discord']}/>
            <div className="text-2xl">로그인 처리중입니다...</div>
        </div>
    );
};

export default LoginCallback;