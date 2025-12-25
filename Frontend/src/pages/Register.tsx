
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRef } from "react"
import { useMutation } from "@tanstack/react-query"
import { register } from "@/http/api"
import { LoaderCircle } from "lucide-react"
const Register = () => {

  const navigate= useNavigate()
  const fullnameref= useRef<HTMLInputElement>(null)
  const emailref = useRef<HTMLInputElement>(null)
  const passwordref= useRef<HTMLInputElement>(null)


    const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
     console.log("login successfully")
     navigate("/dashboard/home")


    },
  })


  const handleRegister=()=>{
    const email= emailref.current?.value
    const password= passwordref.current?.value
    const name= fullnameref.current?.value
     

    if(!email||!password|| !name){
      return alert("password or email required")
    }
    console.log("register successfully")
    mutation.mutate({name,email,password})
  }
  return (
 
   <section className="flex justify-center items-center h-screen">
     <Card  className="w-full max-w-sm" >
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
          {mutation.isError && <span className="tex-red-500 text-sm">{mutation.error.message}</span>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" ref={fullnameref} type="text" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                ref={emailref}
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" ref={passwordref}  type="password" required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              
            </Field>
           
          </FieldGroup>
        </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
        
              <Field>
                <Button  onClick={handleRegister} type="button" disabled={mutation.isPending}>
                            {mutation.isPending && <LoaderCircle className="animate-spin mr-2" />}
         <span >Create Account</span> </Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to={"/auth/login"}>SignIn</Link>
                </FieldDescription>
              </Field>
           
      
      </CardFooter>
    </Card>
   </section>


  )
}

export default Register
