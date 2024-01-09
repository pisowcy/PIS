import React from "react";
import { Navbar } from "@/components/navbar";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="space-y-6">
      <Navbar />
      <div className="mx-auto max-w-md space-y-3 text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Please enter your email and password to sign in to your Cinemania
              account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="moviebuff@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" required type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full py-2 text-white bg-blue-500 hover:bg-blue-700 rounded">
              <Link href="/user-page/1">Sign In</Link>
            </Button>
          </CardFooter>
        </Card>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?
          <Link
            className="font-medium text-indigo-600 hover:text-indigo-500"
            href="/sign-up"
          >
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
