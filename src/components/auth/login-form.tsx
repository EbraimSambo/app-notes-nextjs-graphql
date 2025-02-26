"use client"
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FaNoteSticky } from "react-icons/fa6";
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import { Separator } from '../ui/separator';
import { useLogin } from '@/hooks/auth/login';
import { toast } from '@/hooks/use-toast';
import Loader from '../custom/loader';
const LoginForm = () => {
    const {
        form,
        handleSubmit,
        loading,
        message
    } = useLogin()
    const handleMessagePopOut = ({ message, type }: { message: string, type: "none" | "error" | "success" | undefined }) => {
        if (type === "error") {
            return toast({
                title: "Oops!",
                description: message,
                variant: "destructive",
            });
        }

        if (type === "success") return toast({
            title: "Bem vindo de volta",
            description: "Login efetuado com sucesso",
            variant: "default",
            duration: 80000
        });
    };

    React.useEffect(() => {
        if (message) {
            handleMessagePopOut({ message: message.message, type: message.type });
        }
    }, [message]);
    return (
        <div className='max-w-[350px] w-full '>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                <div className="flex items-center justify-center w-full flex-col gap-1">
                    <div className="h-12 w-12 justify-center flex items-center bg-gray-100 rounded-full">
                        <FaNoteSticky className='h-6 w-6 text-primary' />
                    </div>
                    <p className="text-slate-600 font-medium text-center text-sm">
                        Faca login de forma rapida e segura.
                    </p>
                </div>
                <div className="space-y-1">
                    <Input disabled={loading} {...form.register("email")} placeholder='ebraimsambo@gmail.com' />
                    {form.formState.errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>
                <div className="space-y-1">
                    <Input disabled={loading} {...form.register("password")} type='password' placeholder='sua senha' />
                    {form.formState.errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>
                <div className="space-y-1">
                    <Button disabled={loading} size={"lg"} type='submit' className='w-full font-black py-4'>
                    {!loading ? "Entar" :
                            <Loader atributes={{
                                color: "#fff"
                            }} />}
                    </Button>

                </div>
            </form>
            <div className="flex gap-1 itmes-center justify-between w-ful my-2">
            <Separator className='w-full' /> 
            </div>
            <div className="space-y-2">

                <button className='w-full border font-black flex items-center justify-center gap-1 px-4 py-2 rounded-sm'>
                    <FcGoogle className='h-6 w-6' />  <span className='mt-1 text-sm text-slate-600'>Continuar com Google</span>
                </button>
            </div>
            <div className="text-center mt-2">
                <Link href={'/auth/register'} className='text-center text-xs text-slate-600 mt-2 hover:text-primary' >
                    Tem uma conta?
                </Link>
            </div>
        </div>
    )
}

export default LoginForm