import React from 'react';

function EmptyDashboard() {
    return (
        <div className="h-5/6 flex flex-col items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bol font-bold capitalize">
                    Nothing to see here
                </h1>
                <p className="dark:text-gray-100/70">
                    Create a note or select one to start writing!
                </p>
            </div>
        </div>
    );
}

export default EmptyDashboard;
