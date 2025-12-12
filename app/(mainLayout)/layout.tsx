import Footer from '@/components/Footer'
import Navbar from '@/components/shared/layout/Navbar'
import React from 'react'

const layout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default layout
