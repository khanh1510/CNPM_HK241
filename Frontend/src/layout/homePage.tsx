import React from 'react';
import HeaderLogin from './headerLogin';
import Footer from './footer';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderLogin />
            <main className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url('/src/assets/background.tsx')` }}>
                <div className="flex items-center justify-center h-full">
                    <img src="/src/assets/hcmut.png" alt="Trường Đại Học Bách Khoa" className="rounded-lg shadow-lg" />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
