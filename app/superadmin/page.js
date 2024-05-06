import React from 'react'
import css from './layout.module.css'
import admin from './img/admin.png'
import Image from 'next/image'

export const metadata = {
    title: 'Панель администратора',
    description: 'Панель администратора',
  }

const Admin = () => {
  return (
    <div className={css.page}><Image src={admin} className={css.img}/></div>
  )
}

export default Admin