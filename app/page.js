'use client'
import ForgotPassword from "@/components/ForgotPassword/ForgotPassword";
import Login from "@/components/Login/Login";
import mobx from "@/mobx/mobx";
import { observer } from "mobx-react-lite";


const  Home = observer(() => {
  return (
    <>
      {mobx.forgotpassword?
      <ForgotPassword/>:
      <Login/>
      }
    </>
  );
})

export default Home
