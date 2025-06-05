'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getPlants } from "@/actions/plantAction"
import { PlantCategory } from "./PlantCategory"
import { Input } from "../ui/input"
import { CreatePlant } from "./CreatePlant"
import { useState } from "react"
import { UpdatePlant } from "./UpdatePlant"
import DeletePlant from "./DeletePlant"
import { useRouter } from "next/navigation"


type Plants = Awaited<ReturnType<typeof getPlants>>

interface InventoryTableProps {
  plants: Plants
}

export function InventoryTable({ plants }: InventoryTableProps) {

  const [value, setValue] = useState("")
  const [searchPlant, setSearchPlant] = useState("")
  const router = useRouter()

  const filteredPlants = plants?.filter((plant) => {
    return (
      plant.name.toLowerCase().includes(searchPlant.toLowerCase()) &&
      plant.category.includes(value)
    )
  }).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex w-full space-x-2">
          <Input value={searchPlant} onChange={(e) => setSearchPlant(e.target.value)} placeholder="Search plant" className="max-w-xs" />
          <PlantCategory value={value} setValue={setValue} />
        </div>
        <CreatePlant />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Plant ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filteredPlants?.map((plant) => {
              const slugyfy = `/plants/${plant.id}--${plant.name}`
              return (
                (
                  <TableRow key={plant.id} onClick={() => router.push(slugyfy)} className="cursor-pointer">
                    <TableCell className="font-medium">{plant.id}</TableCell>
                    <TableCell>{plant.name}</TableCell>
                    <TableCell>{plant.category}</TableCell>
                    <TableCell>{plant.stock}</TableCell>
                    <TableCell className="flex justify-end items-center space-x-4 " onClick={(e) => e.stopPropagation()}>
                      <UpdatePlant plant={plant} />
                      <DeletePlant plantId={plant.id} plantImage={plant?.imageUrl} />
                    </TableCell>
                  </TableRow>
                )
              )
            })
          }
        </TableBody>
      </Table>
    </div>
  )
}
