import { getPlantById } from '@/actions/plantAction'
import PlantCard from '@/components/client-side/PlantCard'
import React from 'react'

interface SlugProps {
    params: {
        slug: Promise<string>
    }
}

const page = async({ params }: SlugProps) => {
    const {slug} = await params
    const plantId = (await slug).split("--")[0]
    
    const fetchPlantById = await getPlantById(plantId)

    return (
        <div className='max-w-6xl mx-auto p-6'>
            <PlantCard fetchedPlant={fetchPlantById} />
        </div>
    )
}

export default page