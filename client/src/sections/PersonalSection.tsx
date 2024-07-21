import GoogleCalendar from '@/features/Calendar/GoogleCalendar'
import SlideSection from '@/features/Slides/SlideSection'
import Tasks from '@/features/Tasks/Tasks'
import React, { Suspense } from 'react'

function PersonalSection() {
    return (
        <div className='flex flex-col'>
            <h1>Perosnal section</h1>
            <div className=" w-screen overflow-y-scroll overflow-x-hidden">

                <Suspense>
                    <SlideSection />
                </Suspense>
                <GoogleCalendar />
            </div>

        </div>


    )
}

export default PersonalSection


