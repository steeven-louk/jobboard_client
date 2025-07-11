"use client";

import React, { useState } from "react";
import { toast } from "react-toastify"; 

// Importation des composants UI de Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { AlertCircle, Mail, MapPin, Phone, Send, Loader2 } from "lucide-react"; 

/**
 * @interface ContactFormData
 * @description Définit la structure des données du formulaire de contact.
 */
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  reason: string; 
}

/**
 * @function ContactPage
 * @description Composant de la page de contact.
 * Permet aux utilisateurs d'envoyer un message via un formulaire
 * et affiche les informations de contact de l'entreprise.
 *
 * @returns {JSX.Element} La page de contact.
 */
export default function ContactPage() {
  // État du formulaire de contact
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    reason: "general", 
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  /**
   * @function handleChange
   * @description Gère les changements dans les champs de saisie (Input, Textarea).
   * Met à jour l'état `formData` en fonction du nom du champ.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e L'événement de changement.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Efface l'erreur pour ce champ dès que l'utilisateur commence à taper
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /**
   * @function handleReasonChange
   * @description Gère le changement de la valeur du sélecteur de raison.
   * @param {string} value La nouvelle valeur de la raison sélectionnée.
   */
  const handleReasonChange = (value: string) => {
    setFormData((prev) => ({ ...prev, reason: value }));
    // Efface l'erreur pour la raison si elle existait
    if (errors.reason) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.reason;
        return newErrors;
      });
    }
  };

  /**
   * @function validateForm
   * @description Valide les champs du formulaire avant soumission.
   * @param {ContactFormData} data Les données actuelles du formulaire.
   * @returns {boolean} Vrai si le formulaire est valide, faux sinon.
   */
  const validateForm = (data: ContactFormData): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!data.name.trim()) {
      newErrors.name = "Le nom complet est requis.";
    }
    if (!data.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "L'email n'est pas valide.";
    }
    if (!data.subject.trim()) {
      newErrors.subject = "Le sujet est requis.";
    }
    if (!data.message.trim()) {
      newErrors.message = "Le message est requis.";
    } else if (data.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères.";
    }
    if (!data.reason || data.reason === "") {
      newErrors.reason = "Veuillez sélectionner une raison de contact.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur
  };

  /**
   * @function handleSubmit
   * @description Gère la soumission du formulaire de contact.
   * Effectue la validation, simule un envoi API et gère les feedbacks.
   * @param {React.FormEvent} e L'événement de soumission du formulaire.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(formData)) {
      toast.error("Veuillez corriger les erreurs du formulaire.");
      return;
    }

    setIsSubmitting(true); 

    try {
    
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simule un délai réseau

      console.log("Formulaire soumis avec succès:", formData);
      toast.success("Message envoyé ! Nous vous répondrons dans les plus brefs délais.");

      // Réinitialiser le formulaire après succès
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        reason: "general",
      });
      setErrors({}); // Efface toutes les erreurs
    } catch (error: any) {
      console.error("❌ Erreur lors de l'envoi du formulaire :", error);
      toast.error("Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Contactez-nous</h1>
        <p className="text-center text-lg mb-8 text-gray-700 dark:text-gray-300">
          Vous avez des questions ou des suggestions ? N&apos;hésitez pas à nous contacter. Notre équipe est là pour vous
          aider.
        </p>

        {/* Section des informations de contact rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-lg">Téléphone</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">+33 1 23 45 67 89</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Lun-Ven, 9h-18h</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-lg">Email</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">contact@jobportal.fr</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">support@jobportal.fr</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-lg">Adresse</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">123 Avenue de l&apos;Innovation</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">75001 Paris, France</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section du formulaire de contact et informations détaillées */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Card className="shadow-md h-full">
              <CardHeader>
                <CardTitle>Informations de contact détaillées</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-700 dark:text-gray-300">Remplissez le formulaire et notre équipe vous répondra dans les 24 heures.</p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-2 mt-0.5 text-gray-500 dark:text-gray-300" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-300">Téléphone</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-2 mt-0.5 text-gray-500 dark:text-gray-300" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-300">Email</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">contact@jobportal.fr</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gray-500 dark:text-gray-300" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-300">Adresse</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">123 Avenue de l&apos;Innovation</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">75001 Paris, France</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-300">Heures d&apos;ouverture</h3>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
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
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Envoyez-nous un message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting} 
                        placeholder="Votre nom"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                        disabled={isSubmitting} 
                        placeholder="votre.email@exemple.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Raison du contact</Label>
                    <Select
                      onValueChange={handleReasonChange}
                      value={formData.reason}
                      disabled={isSubmitting} // Désactive le select pendant la soumission
                    >
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
                    {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting} 
                      placeholder="Sujet de votre message"
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
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
                      disabled={isSubmitting} 
                      placeholder="Votre message..."
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <div className="flex items-start space-x-2 text-sm">
                    <AlertCircle className="h-4 w-4 mt-0.5 text-gray-500 dark:text-gray-300" />
                    <p className="text-gray-500 dark:text-gray-300">
                      En soumettant ce formulaire, vous acceptez notre politique de confidentialité et notre politique
                      de traitement des données.
                    </p>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section de la carte Google Maps */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Nous trouver</h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden border shadow-md">
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
  );
}
