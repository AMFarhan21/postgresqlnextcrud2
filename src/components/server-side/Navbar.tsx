import React from 'react'
import { Button } from '../ui/button'
import { Home, LogIn, LogOut, Sprout } from 'lucide-react'
import Link from 'next/link'
import { ThemeButton } from '../client-side/ThemeButton'
import { stackServerApp } from '@/stack'

const Navbar = async () => {

    const user = await stackServerApp.getUser()
    const app = stackServerApp.urls

    return (
        <div className='max-w-screen bg-background mx-auto w-7xl  flex items-center p-4 justify-between sticky top-0'>
            <Link href={"/"} className='font-mono font-bold text-foreground text-xl'>
                🌱PlantInventory
            </Link>
            <div className='flex items-center space-x-4'>
                <Link href={"/plants"}>
                    <Button variant={"ghost"} className='text-foreground'>
                        <Sprout />
                        <label className='hidden md:flex'>
                            Plants
                        </label>
                    </Button>
                </Link>
                <Link href={"/"}>
                    <Button variant={"ghost"} className='text-foreground'>
                        <Home />
                        <label className='hidden md:flex'>
                            Home
                        </label>
                    </Button>
                </Link>
                <ThemeButton />
                {
                    user ? (
                        <div className='flex items-center space-x-4'>
                            <Button variant={"ghost"} className='text-xs' asChild>
                                <Link href={app.signOut}>
                                    <LogOut />
                                    <span className='hidden md:flex'>Logout</span>
                                </Link>
                            </Button>
                            <img src={user?.profileImageUrl ?? "" } className='w-8 h-8 rounded-full' />
                        </div>
                    ) : (
                        <Button asChild variant={"ghost"}>
                            <Link href={app.signIn} className='flex'>
                                <LogIn />
                                <span className='hidden md:flex'>SignIn</span>
                            </Link>
                        </Button>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar