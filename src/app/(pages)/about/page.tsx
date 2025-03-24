import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">À propos de JobPortal</h1>

        <Tabs defaultValue="mission" className="mt-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mission">Notre mission</TabsTrigger>
            <TabsTrigger value="platform">La plateforme</TabsTrigger>
            <TabsTrigger value="team">Notre équipe</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="mission" className="mt-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Notre mission</h2>
              <p>
                Chez JobPortal, notre mission est de connecter les talents avec les meilleures opportunités
                professionnelles. Nous croyons que chaque personne mérite de trouver un emploi qui correspond non
                seulement à ses compétences, mais aussi à ses aspirations et à ses valeurs.
              </p>
              <p>
                Fondée en 2023, notre plateforme s&apos;efforce de rendre le processus de recherche d&apos;emploi et de
                recrutement plus transparent, plus efficace et plus humain. Nous utilisons les dernières technologies
                pour créer une expérience utilisateur optimale, tout en maintenant une approche centrée sur l&apos;humain.
              </p>
              <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="L&apos;équipe JobPortal en réunion"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Nos valeurs</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Transparence</strong> - Nous croyons en une communication ouverte et honnête.
                </li>
                <li>
                  <strong>Innovation</strong> - Nous cherchons constamment à améliorer notre plateforme.
                </li>
                <li>
                  <strong>Inclusion</strong> - Nous valorisons la diversité et l&apos;égalité des chances.
                </li>
                <li>
                  <strong>Excellence</strong> - Nous visons l&apos;excellence dans tout ce que nous faisons.
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="platform" className="mt-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Notre plateforme</h2>
              <p>
                JobPortal est une plateforme moderne de recherche d&apos;emploi qui met en relation les candidats et les
                recruteurs de manière efficace et intuitive. Nous utilisons les dernières technologies pour offrir une
                expérience utilisateur optimale.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                      <h3 className="font-semibold mb-2">Recherche intelligente</h3>
                      <p className="text-sm text-gray-500">
                        Notre algorithme de recherche avancé vous aide à trouver les offres qui correspondent le mieux à
                        votre profil.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      <h3 className="font-semibold mb-2">Profils détaillés</h3>
                      <p className="text-sm text-gray-500">
                        Créez un profil complet pour mettre en valeur vos compétences et votre expérience.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      </div>
                      <h3 className="font-semibold mb-2">Sécurité des données</h3>
                      <p className="text-sm text-gray-500">
                        Nous prenons la protection de vos données personnelles très au sérieux.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-semibold">Fonctionnalités clés</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Recherche d&apos;emploi avancée avec filtres personnalisables</li>
                <li>Profils détaillés pour les candidats et les entreprises</li>
                <li>Système de candidature simplifié</li>
                <li>Tableau de bord pour les recruteurs</li>
                <li>Notifications personnalisées pour les nouvelles offres</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="team" className="mt-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Notre équipe</h2>
              <p>
                JobPortal est porté par une équipe passionnée et diversifiée, dédiée à créer la meilleure plateforme de
                recherche d&apos;emploi possible. Nos membres viennent d&apos;horizons variés, apportant une richesse
                d&apos;expériences et de perspectives.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Sophie Martin"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h3 className="font-semibold">Sophie Martin</h3>
                  <p className="text-sm text-gray-500">Fondatrice & CEO</p>
                </div>

                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Thomas Dubois"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h3 className="font-semibold">Thomas Dubois</h3>
                  <p className="text-sm text-gray-500">CTO</p>
                </div>

                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Léa Bernard"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h3 className="font-semibold">Léa Bernard</h3>
                  <p className="text-sm text-gray-500">Directrice Marketing</p>
                </div>
              </div>

              <p>
                Notre équipe s&apos;agrandit ! Nous sommes toujours à la recherche de talents passionnés pour nous rejoindre
                dans notre mission. Consultez nos offres d&apos;emploi pour découvrir les opportunités actuelles.
              </p>

              <div className="text-center mt-6">
                <Link href="/jobs?search=JobPortal">
                  <Button>Voir nos offres d&apos;emploi</Button>
                </Link>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Contactez-nous</h2>
              <p>
                Vous avez des questions, des suggestions ou besoin d&apos;assistance ? N&apos;hésitez pas à nous contacter. Notre
                équipe est là pour vous aider.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Informations de contact</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 mt-1"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <div>
                          <p className="font-medium">Téléphone</p>
                          <p className="text-sm text-gray-500">+33 1 23 45 67 89</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 mt-1"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-gray-500">contact@jobportal.fr</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 mt-1"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <div>
                          <p className="font-medium">Adresse</p>
                          <p className="text-sm text-gray-500">
                            123 Avenue de l&apos;Innon
                            <br />
                            75001 Paris, France
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Heures d&apos;ouverture</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Lundi - Vendredi</span>
                        <span>9h00 - 18h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Samedi</span>
                        <span>10h00 - 15h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimanche</span>
                        <span>Fermé</span>
                      </div>
                    </div>

                    <h3 className="font-semibold mt-6 mb-4">Suivez-nous</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                      <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      </a>
                      <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </a>
                      <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-6">
                <Link href="/contact">
                  <Button>Nous envoyer un message</Button>
                </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

