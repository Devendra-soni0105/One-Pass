import React from 'react'
import { useForm } from "react-hook-form"
import { useContext } from 'react'
import { TitleContext } from '../../TitleContext'
import { Credentials_favContext } from '../Credentials_favContext'
import { nanoid } from "nanoid"

const AddContent = () => {

    const { title } = useContext(TitleContext)
    const { credentials, setCredentials } = useContext(Credentials_favContext)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (data) => {

        const newData = { ...data, id: nanoid(), isFav: false }

        const updated = [...credentials, newData]   // FIXED
        setCredentials(updated)

        localStorage.setItem("credentials", JSON.stringify(updated)) // FIXED

        reset()
    }


    return (
        <div className='bg-linear-to-br from-[#1a0532] via-[#081423] to-[#002233] self-center w-full h-full flex items-center justify-center'>
            <div className='relative gap-5 w-[95%] h-[95%] flex flex-col items-center bg-linear-to-br from-[#1a0532] via-[#081423] to-[#002233] z-30 shadow-[0_0_20px_4px_rgba(0,180,255,0.35)] border border-white/20 rounded-3xl p-6'>

                {/* Title */}
                <div className="flex items-center">
                    <h3 className='text-white text-4xl'>{title}</h3>
                </div>

                <div className='glass flex flex-col gap-2 rounded-4xl shadow-[0_0_20px_4px_rgba(0,180,255,0.35)] border-black border-2 text-3xl p-10 text-white justify-center'>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full'>

                        {/* App Name */}
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-2 items-center justify-between'>
                                <label htmlFor="appname">Website/App Name</label>
                                {errors.appname && <span className='text-red-500 text-xl'>{errors.appname.message}</span>}
                            </div>
                            <input
                                {...register("appname", {
                                    required: { value: true, message: "App name is required" },
                                    maxLength: { value: 20, message: "Max 20 characters allowed" }
                                })}
                                type="text"
                                className='px-3 w-full rounded-xl  border-2 border-white shadow-[0_0_20px_4px_rgba(0,180,255,0.35)]'
                            />
                        </div>

                        {/* Username */}
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-2 items-center justify-between'>
                                <label htmlFor="username">Username/Email</label>
                                {errors.username && <span className='text-red-500 text-xl'>{errors.username.message}</span>}
                            </div>
                            <input
                                {...register("username", {
                                    required: { value: true, message: "Username is required" }
                                })}
                                type="text"
                                className='px-3 w-full rounded-xl  border-2 border-white shadow-[0_0_20px_4px_rgba(0,180,255,0.35)]'
                            />
                        </div>

                        {/* Password */}
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-2 items-center justify-between'>
                                <label htmlFor="password">Password</label>
                                {errors.password && <span className='text-red-500 text-xl'>{errors.password.message}</span>}
                            </div>
                            <input
                                {...register("password", {
                                    required: { value: true, message: "Password is required" }
                                })}
                                type="password"
                                className='px-3 w-full rounded-xl  border-2 border-white shadow-[0_0_20px_4px_rgba(0,180,255,0.35)]'
                            />
                        </div>

                        {/* URL */}
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-2 items-center justify-between'>
                                <label htmlFor="url">URL</label>
                                {errors.url && <span className='text-red-500 text-xl'>{errors.url.message}</span>}
                            </div>
                            <input
                                {...register("url", {
                                    required: { value: true, message: "URL is required" }
                                })}
                                type="text"
                                className='px-3 w-full rounded-xl  border-2 border-white shadow-[0_0_20px_4px_rgba(0,180,255,0.35)]'
                            />
                        </div>

                        {/* Buttons */}
                        <div className='flex p-2 gap-4 justify-center'>
                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='border-2 p-2 px-16 bg-[#00a8ff] active:translate-y-0.5 rounded-3xl hover:shadow-[0_0_20px_4px_rgba(0,180,255,0.35)]'
                            >
                                Save
                            </button>

                            <button
                                type='reset'
                                onClick={() => reset()}
                                className='border-2 p-2 px-16 bg-red-600 active:translate-y-0.5 rounded-3xl hover:shadow-[0_0_20px_4px_rgba(0,180,255,0.35)]'
                            >
                                Reset
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddContent