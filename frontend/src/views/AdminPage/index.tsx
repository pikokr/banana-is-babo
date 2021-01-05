import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const AdminPage = () => {
    return (
        <div className="pt-2 px-4 md:px-10 lg:px-60">
            <p className="text-2xl">관리패널</p>
            <div className="w-full lg:grid-cols-3 grid-cols-1 grid gap-5">
                <div className="shadow-md p-2 rounded-md hover:shadow-xl transition-shadow">
                    <div className="flex">
                        <div className="flex-grow flex flex-col">
                            <div className="text-gray-500">멤버 수(전체)</div>
                            <div className="text-xl">123</div>
                        </div>
                        <div>
                            <FontAwesomeIcon size="2x" icon={['fas', 'user']} className="h-full"/>
                        </div>
                    </div>
                </div>
                <div className="shadow-md p-2 rounded-md hover:shadow-xl transition-shadow">
                    <div className="flex">
                        <div className="flex-grow flex flex-col">
                            <div className="text-gray-500">봇 수</div>
                            <div className="text-xl">123</div>
                        </div>
                        <div>
                            <FontAwesomeIcon size="2x" icon={['fas', 'user']} className="h-full"/>
                        </div>
                    </div>
                </div>
                <div className="shadow-md p-2 rounded-md hover:shadow-xl transition-shadow">
                    <div className="flex">
                        <div className="flex-grow flex flex-col">
                            <div className="text-gray-500">멤버 수</div>
                            <div className="text-xl">123</div>
                        </div>
                        <div>
                            <FontAwesomeIcon size="2x" icon={['fas', 'user']} className="h-full"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;