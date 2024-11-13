// /src/layout/HomePage.tsx
import React from 'react';
import backgroundUrl from '../../assets/background.png'

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundUrl})` }}>
                <div className="flex items-center justify-center h-full">
                </div>
            </main>
        </div>
    );
};

export default HomePage;