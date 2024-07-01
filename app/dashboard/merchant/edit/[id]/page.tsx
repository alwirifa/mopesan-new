"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const formSchema = z.object({
  pic_name: z.string(),
  email: z.string(),
  merchant_name: z.string(),
  address: z.string(),
  phone_number: z.string(),
});

export default function Home({ params }: { params: { id: string } }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      pic_name: "",
      merchant_name: "",
      address: "",
      phone_number: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem("token");

    toast
      .promise(
        axios.put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/merchants/${params.id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        {
          loading: "Updating merchant...",
          success: "Merchant updated successfully!",
          error: "Failed to update merchant.",
        }
      )
      .then(() => {
        router.push(`/dashboard/merchant/${params.id}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="min-h-screen ">
      <div className="h-full lg:flex flex-col p-4 space-y-4 ">
        <Link
          href={`/dashboard/merchant/${params.id}`}
          className="flex items-center gap-1"
        >
          <img src="/icons/chevron-left.svg" alt="" />
          <p className="text-sm font-semibold text-primary">
            Back to merchant 
          </p>
        </Link>

        <Card className="w-full ">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Edit Merchant</CardTitle>
            {/* <CardDescription>Edit Merchant</CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="pic_name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>PIC Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="PIC Name"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email address"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="merchant_name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Merchant Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Merchant Name"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Address" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Phone Number"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div className="w-full flex justify-end mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 font-medium text-sm rounded-md bg-primary text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Form>
          </CardContent>
          {/* <CardFooter
            onClick={() => router.push("/sign-up")}
            className="text-sm text-muted-foreground"
          >
            Don’t have an account?
            <span className="ml-1 hover:underline cursor-pointer">Sign up</span>
          </CardFooter> */}
        </Card>
      </div>
    </div>
  );
}
