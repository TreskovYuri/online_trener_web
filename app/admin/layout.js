"use client"
import Sidebar from '@/components/Sidebar/Sidebar';
import css from './layout.module.css'
import Header from '@/components/Header/Header';
import { useEffect } from 'react';
import UserUtills from '@/http/UserUtills';
import { useRouter } from 'next/navigation';




export default function RootLayout({ children }) {
  const router = useRouter()

  const chech = async() => {
    const response = await UserUtills.check()
    if (!response){
      router.push('/')
    }
  }
  useEffect(()=>{
    chech()
  },[])
  return (

      <div className={css.container}>
        <Sidebar/>
        <div className={css.column}>
          <Header/>
          {children}
        </div>
      </div>


  );
}
