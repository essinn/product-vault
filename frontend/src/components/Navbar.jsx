import React from 'react'
import { Link } from 'react-router-dom'
import { CiCirclePlus } from 'react-icons/ci'
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { Button, useColorMode } from '@chakra-ui/react'
import { useProductStore } from '../store/product';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className='max-w-[1140px] p-5 mx-auto'>
        <div className='flex justify-between items-center'>
            <div className='font-semibold'>
                <Link to={'/'}>
                    Product Vault
                </Link>
            </div>

            <div className='flex items-center gap-2.5'>
                <Link to={'/create'}>
                    <CiCirclePlus className='text-[32px]' />
                </Link>

                <Button onClick={toggleColorMode} fontSize={32}>
                    {colorMode === 'light' ? <CiDark /> : <CiLight />}
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Navbar