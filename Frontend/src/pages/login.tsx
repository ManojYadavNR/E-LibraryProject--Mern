import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"
import { useMutation } from "@tanstack/react-query"
import { login } from "@/http/api"
import { LoaderCircle } from "lucide-react"


const Login = () => {
 const navigate= useNavigate()

  const emailref = useRef<HTMLInputElement>(null)
  const passwordref= useRef<HTMLInputElement>(null)


    const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
     console.log("login successfully")
     navigate("/dashboard/home")


    },
  })


  const handlelogin=()=>{
    const email= emailref.current?.value
    const password= passwordref.current?.value
     

    if(!email||!password){
      return alert("password or email required")
    }
    mutation.mutate({email,password})
  }
  return (
   
  <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
          
        </CardDescription>
        <CardAction>
          <Button variant="link"><Link to={"/auth/register"}>Sign up</Link></Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                ref={emailref}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" ref={passwordref} type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={handlelogin} type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending && <LoaderCircle className="animate-spin mr-2" />}
         <span >Login</span> 
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>

  </section>

  )
}

export default Login