import { getUserId } from '@/actions/action'
import { getPlants } from '@/actions/plantAction'
import { InventoryTable } from '@/components/client-side/InventoryTable'
import React from 'react'

const page = async () => {
  const userId = await getUserId() as string

  const plants = await getPlants(userId)
  return (
    <div className='w-6xl mx-auto mt-8 max-w-screen px-6'>
      <InventoryTable plants={plants} />
    </div>
  )
}

export default page