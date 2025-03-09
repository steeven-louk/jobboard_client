"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
// import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import {signIn} from "next-auth/react"
export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [role, setRole] = useState("candidate")
  const router = useRouter()

  const URL ="http://localhost:5800/api/auth/login"

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
    try {
        // if(!email || !password){
        //     console.log("email ou mot de passe incorrect");
        // }
        const result = await signIn("credentials",{
          email,
          password,
          redirect:false
        })
        if (result?.error) {
          setError("Identifiants incorrects");
        } else {
          router.push("/");
        }
        // const login = await axios.post(URL,{
        //     email,
        //     password
        // });
        // if(login.status ===200){
        //     console.log(login)
        //     router.push("/")
        //     localStorage.setItem("token",JSON.stringify(login.data.token))
        // }
    // Ici, vous implémenteriez la logique de connexion
    console.log("Tentative de connexion avec:", { email, password, role })
    // Après une connexion réussie, redirigez l'utilisateur
    // router.push("/dashboard")
    } catch (error) {
      toast("Erreur", {
                description: "Erreur lors de la connexion",
              })
        console.log("erreur lors de la connexion", error);
    }
  }

  const handleGoogleSignIn = () => {
    // signIn("google", { callbackUrl: "/dashboard" })
    console.log("sign in with google")
  }

  return (
    <div className="flex min-h-screen container mx-auto">
      <div className=" flex flex-1 flex-col  justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto  w-full max-w-sm lg:w-96">
          <Card className="shadow-md shadow-black">
            <CardHeader>
              <CardTitle>Connexion</CardTitle>
              <CardDescription>Connectez-vous à votre compte JobBoard</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={role} onValueChange={setRole} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="candidate">Candidat</TabsTrigger>
                  <TabsTrigger value="recruiter">Recruteur</TabsTrigger>
                </TabsList>
                <TabsContent value="candidate">
                  {error && <p className="text-red-500">{error}</p>}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email-candidate">Adresse e-mail</Label>
                      <Input
                        id="email-candidate"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password-candidate">Mot de passe</Label>
                      <Input
                        id="password-candidate"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Se connecter en tant que candidat
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="recruiter">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email-recruiter">Adresse e-mail professionnelle</Label>
                      <Input
                        id="email-recruiter"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password-recruiter">Mot de passe</Label>
                      <Input
                        id="password-recruiter"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Se connecter en tant que recruteur
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              <Separator className="my-4" />
              <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
                
                <Image src="/google-logo.svg" alt="Google logo" width={20} height={20} className="mr-2" />
                Se connecter avec Google
              </Button>
            </CardContent>
            <CardFooter>
              <p className="text-center text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  S&apos;inscrire
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="p-2 relative hidden flex-1 lg:block">
        <Image src={"/assets/bg-auth.webp"} alt="Image de connexion" layout="fill" objectFit="cover" className="w-full rounded-md" />
      </div>
    </div>
  )
}

