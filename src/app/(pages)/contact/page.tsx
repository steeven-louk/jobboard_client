"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { toast } from "@/components/ui/use-toast"
import { AlertCircle, Mail, MapPin, Phone } from "lucide-react"
// import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    reason: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleReasonChange = (value: string) => {
    setFormData((prev) => ({ ...prev, reason: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData)
    //   toast({
    //     "Message envoyé"
    //     description: "Nous vous répondrons dans les plus brefs délais.",
    //   })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        reason: "general",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Contactez-nous</h1>
        <p className="text-center text-lg mb-8">
          Vous avez des questions ou des suggestions ? N&apos;hésitez pas à nous contacter. Notre équipe est là pour vous
          aider.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Téléphone</h3>
                <p className="text-sm text-gray-500">+33 1 23 45 67 89</p>
                <p className="text-sm text-gray-500">Lun-Ven, 9h-18h</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-gray-500">contact@jobportal.fr</p>
                <p className="text-sm text-gray-500">support@jobportal.fr</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Adresse</h3>
                <p className="text-sm text-gray-500">123 Avenue de l&apos;Inno</p>
                <p className="text-sm text-gray-500">75001 Paris, France</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Remplissez le formulaire et notre équipe vous répondra dans les 24 heures.</p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-sm text-gray-500">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-500">contact@jobportal.fr</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-sm text-gray-500">123 Avenue de l&apos;Inno</p>
                      <p className="text-sm text-gray-500">75001 Paris, France</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Heures d&apos;ouverture</h3>
                  <div className="space-y-1 text-sm">
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
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Envoyez-nous un message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Raison du contact</Label>
                    <Select onValueChange={handleReasonChange} defaultValue={formData.reason}>
                      <SelectTrigger id="reason">
                        <SelectValue placeholder="Sélectionnez une raison" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Renseignement général</SelectItem>
                        <SelectItem value="support">Support technique</SelectItem>
                        <SelectItem value="billing">Facturation</SelectItem>
                        <SelectItem value="partnership">Partenariat</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2 text-sm">
                    <AlertCircle className="h-4 w-4 mt-0.5 text-gray-500" />
                    <p className="text-gray-500">
                      En soumettant ce formulaire, vous acceptez notre politique de confidentialité et notre politique
                      de traitement des données.
                    </p>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Nous trouver</h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9993074820384!2d2.2944813156742334!3d48.85884407928774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66feca8c5fdb5%3A0x2c18b5709b5ed7c7!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1632222222222"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Carte de notre emplacement"
            ></iframe>

          </div>
        </div>
      </div>
    </div>
  )
}

