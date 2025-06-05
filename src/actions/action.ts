import { stackServerApp } from "@/stack";

export async function getUserId() {
    const user = await stackServerApp.getUser()
    const userId = user?.id

    return userId
}