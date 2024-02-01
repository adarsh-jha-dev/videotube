import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { login } from "@/store/AuthSlice";
import { Button } from "./ui/button";
import axios from "../services/axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().email({ message: "Please provide a valid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters long" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setLoading(true);
    try {
      const response = await axios.post(`/users/login`, values);

      if (response && response.data.statusCode === 200) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        dispatch(login({ userData: response.data.data.user }));
        toast("Signed-in successfully");
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      toast("Something went wrong while signing up, " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" type="email" />
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
                  <Input {...field} placeholder="Password" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit">
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
        <ToastContainer />
      </Form>
    </div>
  );
};

export default Login;
