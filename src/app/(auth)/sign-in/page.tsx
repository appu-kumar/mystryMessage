/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
import Link from "next/link";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { toast } = useToast();
  const router = useRouter();

  // Zod implementation
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema), // integrate zod schema

  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
       const result = await signIn('credentials',{
        redirect:false,
        identifier:data.identifier,
        password:data.password
       })

       if(result?.error){
        toast({
          title:"Login Failed",
          description:"Incorrect username or password",
          variant:"destructive"
        })
        return;
       }

       if(result?.url){
        router.replace("/dashboard");
       }
       else{
        toast({
          title:"Login Failed",
          description:"Url is incorrect",
          variant:"destructive"
        })
       }
  
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Sign in Mystry message
          </h1>
          <p className="mb-4">Sign in to use the mystry message service</p>
        </div>
        <Form {...form}>
          {" "}
          {/*  form is holding username, email,password see above  */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Email/Username" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         

            <Button type="submit">Sign in</Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            Are you new User?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
