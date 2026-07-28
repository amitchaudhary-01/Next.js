import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-400'>
                <h1 className='text-red-500 items-start'>Icon</h1>

   
    <div className='flex justify-center gap-6'>
      <Link href='/' className='hover:text-blue-500'>Home</Link>
      <Link href='products'className='hover:text-blue-500'>Products</Link>
      <Link href='contact' className='hover:text-blue-500'>Contact</Link>
      <Link href='about' className='hover:text-blue-500'>About</Link>

      <Link href='login' className='hover:text-green-400 items-end'>Login</Link>
      <Link href='logout' className='hover:text-red-500 items-end'>LogOut</Link>

       </div>
    </nav>
  )
}

export default Navbar
