"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("candidate");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Identifiants incorrects");
        setLoading(false);
      } else {
        router.push("/");
        setLoading(false);
      }

      // console.log("Tentative de connexion avec:", { email, password, role });
    } catch (error) {
      toast.error("Erreur lors de la connexion");
      console.error("erreur lors de la connexion", error);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh -25rem)] md:min-h-screen container mx-auto">
      <div className=" flex flex-1 flex-col  justify-center px-4 md:py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto  w-full max-w-sm lg:w-96">
          <Card className="shadow-md shadow-black">
            <CardHeader>
              <CardTitle>Connexion</CardTitle>
              <CardDescription>
                Connectez-vous à votre compte JobBoard
              </CardDescription>
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
                        disabled={loading}
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
                        disabled={loading}
                      />
                    </div>
                    <Button disabled={loading} type="submit" className="w-full">
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Connexion en cours...
                        </>
                      ) : (
                        "Se connecter en tant que candidat"
                      )}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="recruiter">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email-recruiter">
                        Adresse e-mail professionnelle
                      </Label>
                      <Input
                        id="email-recruiter"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
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
                        disabled={loading}
                      />
                    </div>
                    <Button disabled={loading} type="submit" className="w-full">
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Connexion en cours...
                        </>
                      ) : (
                        "Se connecter en tant que recruteur"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              <Separator className="my-4" />
            </CardContent>
            <CardFooter>
              <p className="text-center text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  S&apos;inscrire
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="p-2 relative hidden flex-1 lg:block">
        <Image
          src={"/assets/bg-auth.webp"}
          alt="Image de connexion"
          layout="fill"
          objectFit="cover"
          className="w-full rounded-md"
        />
      </div>
    </div>
  );
}
