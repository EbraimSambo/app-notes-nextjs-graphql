import React from 'react'
import Header from './partials/headr'
import Sidebar from './partials/sidebar'

const AppLoyut = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <div className="flex gap-2 w-full h-[100vh] ">
            <Sidebar/>
                <main className='w-full'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AppLoyut