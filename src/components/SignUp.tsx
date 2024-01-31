import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/store/AuthSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<any>(null);
  const [coverImage, setCoverImage] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAvatarChange = (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleCoverImageChange = (e: any) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const formSchema = z.object({
    email: z.string().email({ message: "Please provide a valid email" }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    fullname: z
      .string()
      .min(2, { message: "Fullname must be atleast 2 characters long" }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters long" }),
    avatar: z.string(),
    coverImage: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      fullname: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("username", values.username);
      formData.append("fullname", values.fullname);
      formData.append("password", values.password);
      formData.append("avatar", avatar);
      formData.append("coverImage", coverImage);

      const response = await axios.post(
        `${import.meta.env.VITE_APP_VIDEOTUBE_BACKEND_BASE_URL}/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        dispatch(login({ userData: response.data.data.createdUser }));
        toast("Signed-up successfully");
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
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
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Avatar"
                  type="file"
                  onChange={(e) => {
                    handleAvatarChange(e);
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Cover Image"
                  type="file"
                  onChange={(e) => {
                    handleCoverImageChange(e);
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUp;
