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
export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [role, setRole] = useState("candidate")
  const [company, setCompany] = useState("")
  const router = useRouter()
const URL ="http://localhost:5800/api/auth/register"

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      if(!email || !password || !name || !phone || !city){
        console.log("veuillez remplir tout les champs");
    }
    const register = await axios.post(URL,{
        fullName: name,
        email,
        password,
        phone:phone.toString(),
        city
    });
    if(register.status ===201){
        console.log(register)
        router.push("/auth/login")
    }
      // Ici, vous implémenteriez la logique d'inscription
    console.log("Tentative d'inscription avec:", { name, email, password, role, company })
    // Après une inscription réussie, redirigez l'utilisateur
    // router.push("/dashboard")
    }
    catch (error){
      console.log("error lors du register", error);
    }
  }

  const handleGoogleSignIn = () => {
    // signIn("google", { callbackUrl: "/dashboard" });
    console.log("sign In");
  }
 

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Card>
            <CardHeader>
              <CardTitle>Inscription</CardTitle>
              <CardDescription>Créez votre compte JobBoard</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={role} onValueChange={setRole} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="candidate">Candidat</TabsTrigger>
                  <TabsTrigger value="recruiter">Recruteur</TabsTrigger>
                </TabsList>
                <TabsContent value="candidate">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name-candidate">Nom complet</Label>
                      <Input
                        id="name-candidate"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
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
                    <div>
                      <Label htmlFor="phone-candidate">Telephone</Label>
                      <Input
                        id="phone-candidate"
                        type="tel"
                        value={phone}
                        name ="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ville-candidate">Ville</Label>
                      <Input
                        id="ville-candidate"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      S&apos;inscrire en tant que candidat
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="recruiter">
                  <form  className="space-y-4">
                    <div>
                      <Label htmlFor="name-recruiter">Nom complet</Label>
                      <Input
                        id="name-recruiter"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
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
                    <div>
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      S&apos;inscrire en tant que recruteur
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              <Separator className="my-4" />
              <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
                <Image src="/google-logo.svg" alt="Google logo" width={20} height={20} className="mr-2" />
                S&apos;inscrire avec Google
              </Button>
            </CardContent>
            <CardFooter>
              <p className="text-center text-sm text-gray-600">
                Déjà un compte ?{" "}
                <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Se connecter
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Image d'inscription"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  )
}

