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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");

  const [role, setRole] = useState<"candidate" | "recruiter">("candidate");
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
        // Gère les erreurs renvoyées par NextAuth.js (ex: "CredentialsSignin" si authorize échoue)
        setError("Identifiants incorrects. Veuillez vérifier votre email et mot de passe.");
        toast.error("Identifiants incorrects.");
      } else {
        // Connexion réussie, redirige l'utilisateur vers la page d'accueil
        toast.success("Connexion réussie ! Redirection...");
        router.push("/");
      }
    } catch (error: any) {
      // Gère les erreurs inattendues lors de la soumission (ex: problème réseau avant l'appel signIn)
      toast.error("Une erreur inattendue est survenue lors de la connexion.");
      console.error("❌ Erreur lors de la connexion :", error);
      setError("Une erreur inattendue est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false); // Désactive l'état de chargement, que l'opération réussisse ou échoue
    }
  };

  return (
    <div className="flex min-h-[calc(100vh -25rem)] md:min-h-screen container mx-auto">
      <div className=" flex flex-1 flex-col  justify-center px-4 md:py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto  w-full max-w-sm lg:w-96">
          <Card className="shadow-md shadow-black">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
              <CardDescription>
                Connectez-vous à votre compte JobBoard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={role} onValueChange={(value) => setRole(value as "candidate" | "recruiter")} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="candidate">Candidat</TabsTrigger>
                  <TabsTrigger value="recruiter">Recruteur</TabsTrigger>
                </TabsList>
                <TabsContent value="candidate">
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="email-candidate">Adresse e-mail</Label>
                      <Input
                        id="email-candidate"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        placeholder="votre.email@exemple.com"
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
                        placeholder="********"
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
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
                        placeholder="entreprise@exemple.com"
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
                        placeholder="********"
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
             <CardFooter className="flex justify-center">
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
          alt="Image d'arrière-plan de connexion"
          fill 
          style={{ objectFit: 'cover' }} 
          className="w-full rounded-md"
        />
      </div>
    </div>
  );
}
