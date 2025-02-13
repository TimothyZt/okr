"use client"
import React, { FormEventHandler } from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata, NextPage } from "next";
import {useState} from "react";
import { signIn } from "next-auth/react";
import { Console } from "console";

interface Props {}
// export const metadata: Metadata = {
//   title: "C&C OKR System Login",
//   description: "",
// };

const SignIn: NextPage = (props): JSX.Element => {
  const[userInfo,setUserInfo]=useState({username:"",password:""})
  const handleSubmit:FormEventHandler<HTMLFormElement>=async(e)=>{
    e.preventDefault();
     const res=await signIn('credentials',{
      username:userInfo.username,
      password:userInfo.password,
      redirect: false,
    })

    if (res?.ok) {
      signIn("credentials", {
        username:userInfo.username,
        password:userInfo.password,
      });
    } else {
      // TODO: Show error message with toast
      let myloginAlert = document.getElementById('loginAlert') as HTMLInputElement;
      myloginAlert.innerHTML = res?.error ?? "系統錯誤";
      
    }
  }

  return (
    <div className="w-full flex items-center justify-center h-screen">
<form method="post" action="/api/auth/callback/credentials" onSubmit={handleSubmit} className="w-1/2">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center justify-center">  
          <div className="w-full border-stroke dark:border-strokedark xl:w-2/3">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <Link href="/">
          <Image
            width={300}
            height={36}
            src={"/images/logo/logo.png"}
            alt="Logo"
            priority
          />
          </Link>
              <h2 className="mb-9 text-2xl font-bold mt-6 text-black dark:text-white sm:text-title-xl2">
                登陸OKR系統
              </h2>

            
                <div className="mb-4">
               
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    登錄賬號
                  </label>
                  <div className="relative">
                    <input
                    value={userInfo.username}
                    onChange={({target})=>
                      setUserInfo({...userInfo,username:target.value})
                    }
                      type="text"
                      placeholder="請輸入您的登錄賬號"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      {/* <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg> */}
                      <svg
                    className="fill-current"
                    width="22"
                        height="22"
                        viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                     <g opacity="0.5">
                    <path
                      d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                      fill=""
                    />
                    <path
                      d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                      fill=""
                    />
                    </g>
                  </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    登錄密碼
                  </label>
                  <div className="relative">
                    <input
                    value={userInfo.password}
                    onChange={({target})=>
                      setUserInfo({...userInfo,password:target.value})
                    }
                      type="password"
                      placeholder="請輸入您的登錄密碼"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="text-danger mb-6" id="loginAlert"></div>
                <div className="mb-5">
                  <input
                    type="submit"
                    value="登錄"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>                  
            
            </div>
          </div>
        </div>
      </div>
      </form>
      </div>
  );
};

export default SignIn;
