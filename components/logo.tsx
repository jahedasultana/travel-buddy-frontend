import { PlaneTakeoff } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <div className="flex items-center gap-3">
                <PlaneTakeoff />
                <h3 className='text-lg font-bold'>Travel Buddy</h3>
            </div>
    )
}

export default Logo
