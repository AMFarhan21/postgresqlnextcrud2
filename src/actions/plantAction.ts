"use server"
import prisma from "@/lib/prisma";
import { getUserId } from "./action";
import { Prisma } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";



const utapi = new UTApi()
export async function getPlants(id: string) {
    try {
        const plants = await prisma.plant.findMany({
            where: {
                userId: id
            }
        })

        return plants
    } catch (error) {
        console.error("Error fetching the plants: ", error)
    }
}


export async function createPlants(plantsData: Prisma.PlantCreateInput) {
    const userId = await getUserId() as string
    if (!userId) return
    try {
        const createdPlants = await prisma.plant.create({
            data: {
                ...plantsData,
                userId: userId
            }
        })
        revalidatePath("/plants")
        return createdPlants
    } catch (error) {
        console.error("Error creating the plant: ", error)
    }
}

export async function updatePlants(plantsData: Prisma.PlantUpdateInput, id: string, prevImageUrl?: string) {
    try {
        const userId = await getUserId()
        const updatedPlants = await prisma.plant.update({
            where: {
                id
            },
            data: {
                ...plantsData,
                userId: userId
            }
        })
        
        const prevImage = prevImageUrl?.split("/").pop()

        if(prevImage) {
            await utapi.deleteFiles(prevImage)
        }

        revalidatePath("/plants")
        return updatedPlants
    } catch (error) {
        console.error("Error updating plant: ", error)
    }
}


export async function deletePlants(id: string, plantImage: string | null) {
    try {
        await prisma.plant.delete({
            where: {
                id
            }
        })
        if (plantImage) {
            const fileKey = plantImage?.split("/").pop()
            if(fileKey) {
                await utapi.deleteFiles(fileKey);
            }
        }

        revalidatePath("/plants")
    } catch (error) {
        console.error("Error deleting plant: ", error)
    }
}


export async function getPlantById(id: string) {
    try {
        const response = await prisma.plant.findFirst({
            where: {
                id,
            }
        })
        return response
    } catch (error) {
        console.error("Error fetching the plant by id: ", error)
    }
}