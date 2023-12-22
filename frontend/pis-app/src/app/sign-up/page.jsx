import React from 'react';
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from '@/components/navbar'

export default function SignUp() {
  return (
    <div className="space-y-6">
      <Navbar />
      <div className="mx-auto max-w-sm space-y-3 text-center">
        <h1 className="text-3xl font-bold">Cinemania Registration</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
      </div>
      <Card className="mx-auto max-w-sm space-y-4 ">
        <CardContent>
          <div className="space-y-2 mb-4">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Username" required />
          </div>
          <div className="space-y-2 mb-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Password must be at least 8 characters" required type="password" />
          </div>
        </CardContent>
         <div className="text-center space-y-2">
          <p className="text-gray-500 dark:text-gray-400">
            You already have an account?<Link className="text-blue-500 hover:text-blue-700" href="/sign-in"> Sign in</Link>
          </p>
        </div>
        <Button className="w-full py-2 text-white bg-blue-500 hover:bg-blue-700 rounded" type="submit">
          Register
        </Button>
      </Card>
    </div>
  );
}