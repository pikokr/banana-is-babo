import React from 'react';

const App = () => {
    return (
        <div>
            <div className="flex justify-between items-center border-b-2 border-gray-100 p-4 md:px-10 lg:px-60">
                <div className="flex justify-start">
                    <a href="/">
                        <span className="text-3xl">BANANA</span>
                    </a>
                </div>
                <div className="flex justify-end">
                    <a href="#" className="text-center justify-center px-4 py-2 border-transparent rounded-md bg-indigo-600 text-white">
                        로그인
                    </a>
                </div>
            </div>
        </div>
    );
};

export default App;