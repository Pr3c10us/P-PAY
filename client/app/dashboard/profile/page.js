'use client';
import React from 'react';
import ChangePassword from './changePassword';
import ChangePin from './changePin';
import EditProfile from './editProfile';

const Settings = () => {
    return (
        <main className="flex flex-col items-center gap-y-8 py-12 px-8">
            {/* <h1 className="w-full text-3xl xsm:text-4xl font-semibold underline">
                User Settings
            </h1> */}
            <EditProfile />
            <ChangePassword />
            <ChangePin />
        </main>
    );
};

export default Settings;
