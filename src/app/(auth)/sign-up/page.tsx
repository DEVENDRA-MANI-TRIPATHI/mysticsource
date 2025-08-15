
'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import {useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, {AxiosError} from 'axios';
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fi } from "zod/v4/locales";
import { Button } from "@/components/ui/button";
import { Loader } from 'lucide-react';






const page = () => {

  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIscheckingUsername] = useState(false);
  const [isSubmitting,setIsSubmitting]=useState(false)
  
  const debounced = useDebounceCallback(setUsername, 300);
  const router = useRouter();

  //Zod Implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIscheckingUsername(true)
        setUsernameMessage('')
        try {
          const response = await axios.get(`/api/unique-username-check?username=${username}`)
          let message=response.data.message
          setUsernameMessage(message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          setUsernameMessage(axiosError.response?.data.message ?? "Error while checking username");
        } finally {
          setIscheckingUsername(false)
        }
      }
    }

    checkUsernameUnique();
  }, [username])
  
  //submit Handler for react form hook
  const onSubmit = async (data:z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)

    try {
      const response = await axios.post<ApiResponse>(`/api/sign-up`, data);
      toast(response.data.message);

      router.replace(`/verify/${username}`);
      setIsSubmitting(false);

    } catch (error) {
      console.error("Error in signup user", error);

      const axiosError = error as AxiosError<ApiResponse>
      let errorMessage = axiosError.response?.data.message;
      toast(errorMessage);
      setIsSubmitting(false);
    }

  }
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 ">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Join Mystic Source
          </h1>
          <p className="mb-4 text-gray-600">
              Sign up to start your anonymous adventure
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400">Username</FormLabel>
                      <FormControl>
                        <Input className="text-gray-200" placeholder="username"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            debounced(e.target.value)
                          }}
                        />
                      </FormControl>
                      {isCheckingUsername && <Loader className="animate-spin" />}
                      <p className={`text-sm ${usernameMessage === "username is unique" ?'text-green-500' : 'text-red-500' }`}>
                          {usernameMessage}
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400">Email</FormLabel>
                      <FormControl>
                        <Input className="text-gray-200" placeholder="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400">Password</FormLabel>
                      <FormControl>
                        <Input className="text-gray-200" type="password" placeholder="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            <Button className="bg-blue-800 hover:bg-blue-700" type="submit" disabled={isSubmitting}>
              {
                isSubmitting ? (
                  <>
                    <Loader className="animate-spin"/> Please wait
                  </>
                ):('Signup')
              }
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4 text-gray-300">
          <p>
            Already a member? {''}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
    </div>
  )
}

export default page;