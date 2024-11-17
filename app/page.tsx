import Image from "next/image";
import { Check, Gift, Heart, Instagram, QrCode, X } from "lucide-react";
import { Accordion } from "../components/accordion";
import Link from "next/link";

import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { Header } from "../components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#457B9D]">
              Hora de presentear quem é importante
            </h1>
            <p className="text-xl text-[#4A4E69]">
              Crie um livro de memórias para presentear aquela pessoa importante
              com memórias marcantes.
            </p>
            <div className="relative h-16 lg:h-14 w-full lg:w-80">
              <Link href={"/create"}>
                <button
                  className="bg-[#FF6B6B] text-white px-8 py-3 rounded-lg 
                    text-lg font-medium hover:bg-[#ef6c6c] transition-colors shadow-lg shadow-[#ff6b6b8d]"
                >
                  Quero fazer o meu
                </button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-[#ff6b6b30] blur-3xl rounded-full"></div>
            {/* <Image
              src="/hero-img.png"
              width={480}
              height={620}
              alt="QrCode Box"
              className="relative mx-auto md:p-4"
            /> */}
            <QrCode className="size-[280px] text-[#ef6c6c] mx-auto relative" />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-12">
        <div
          className="flex flex-col sm:flex-row flex-wrap justify-center 
          items-center gap-6 sm:gap-12"
        >
          <p className="text-[#4A4E69]">Nos veja no</p>
          <div className="flex items-center gap-6">
            <Instagram className="h-8 w-8 text-[#4A4E69]" />
            <svg className="h-8 w-8" viewBox="0 0 24 24">
              <path
                fill="#4A4E69"
                d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
              />
            </svg>
            <svg className="h-8 w-8" viewBox="0 0 24 24">
              <path
                fill="#4A4E69"
                d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"
              />
            </svg>
          </div>
          <p className="text-[#4A4E69]">+1000 presenteados</p>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold mb-16 text-center text-title">
          Como funciona
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "1. Preencha os dados", image: "/placeholder.svg" },
            { title: "2. Faça o pagamento", image: "/placeholder.svg" },
            {
              title: "3. Receba o seu site + QR Code no e-mail",
              image: "/placeholder.svg",
            },
            { title: "4. Surpreenda seu amor", image: "/placeholder.svg" },
          ].map((step, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-red-100 to-red-300 rounded-xl p-6 space-y-4 border 
              border-primary"
            >
              <Image
                src={step.image}
                width={300}
                height={200}
                alt={step.title}
                className="rounded-lg"
              />
              <h3 className="text-xl font-semibold">{step.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-24 flex flex-col">
        <h2 className="text-4xl font-bold mb-16 text-center text-title">
          Preços
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
          {[
            {
              name: "Básico",
              price: "R$9",
              slug: "BASIC",
              features: ["1 ano de acesso", "7 fotos/páginas", "Web"],
              recommended: false,
            },
            {
              name: "Intermediário",
              price: "R$19",
              slug: "AVANCED",
              features: ["Pra sempre", "10 fotos/páginas", "Web & PDF"],
              recommended: true,
            },
            {
              name: "Premium",
              price: "R$39",
              slug: "PREMIUM",
              features: [
                "Pra sempre",
                "20 fotos/páginas",
                "Web & PDF",
                "1 vídeo",
              ],
              recommended: false,
            },
          ].map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 flex flex-col ${
                plan.recommended
                  ? "border-2 border-[#FF6B6B] relative"
                  : "border"
              }`}
            >
              {plan.recommended && (
                <span
                  className="absolute -top-3 right-4 bg-[#FF6B6B] text-sm px-3 
                  py-1 rounded-full text-white"
                >
                  Recomendado
                </span>
              )}
              <h3 className="text-xl mb-2 text-text">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6 text-title">{plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-text">
                    {feature.includes("Sem") ? (
                      <X className="h-5 w-5 text-primary" />
                    ) : (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <div className="relative h-16 lg:h-14 w-full">
                  <Link href={`/create?plan=${plan.slug}`}>
                    <button
                      className="bg-[#FF6B6B] text-white px-8 py-3 rounded-lg 
                    text-lg font-medium hover:bg-[#ef6c6c] transition-colors w-full"
                    >
                      Quero esse!
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <span className="mb-4 text-center text-text mt-16 mx-auto">
          Com coautoria
        </span>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-4 w-full">
          {[
            {
              name: "Básico",
              price: "R$14",
              features: [
                "1 ano de acesso",
                "Até 4 coautores",
                "2 fotos por coautor",
                "Web",
              ],
              recommended: false,
            },
            {
              name: "Intermediário",
              price: "R$24",
              features: [
                "Pra sempre",
                "Até 5 coautores",
                "3 fotos por coautor",
                "Web",
              ],
              recommended: true,
            },
            {
              name: "Premium",
              price: "R$54",
              features: [
                "Pra sempre",
                "Até 6 coautores",
                "4 fotos por coautor",
                "Web & PDF",
                "1 vídeo por coautor(conta como foto)",
              ],
              recommended: false,
            },
          ].map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 ${
                plan.recommended ? "border-2 border-primary relative" : "border"
              }`}
            >
              {plan.recommended && (
                <span
                  className="absolute -top-3 right-4 bg-primary text-sm px-3 
                py-1 rounded-full"
                >
                  Recomendado
                </span>
              )}
              <h3 className="text-xl mb-2 text-text">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6 text-title">{plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-text">
                    {feature.includes("Sem") ? (
                      <X className="h-5 w-5 text-primary" />
                    ) : (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div> */}
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold mb-16 text-center text-title">
          Perguntas Frequentes
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            {
              question: "O que é a Giftmind?",
              answer:
                "Uma plataforma inspirada na Loveyuu com intuito de fazer você poder presentear seus amores com lembranças únicas. Você pode adicionar fotos mensagens com as lembranças com quem vc ama.",
            },
            {
              question:
                "Como recebo minha página personalizada após o pagamento?",
              answer:
                "Sua página personalizada vai ser enviada pelo seu e-mail de preferência",
            },
            {
              question: "A página personalizada tem validade?",
              answer: "Dependendo do plano, só checar na área de preços",
            },
            {
              question: "Posso editar minha página depois de criá-la?",
              answer:
                "Sim, no momento que criar sua página receberá também um link de edição",
            },
            {
              question: "Quais são as formas de pagamento?",
              answer:
                "No momento, somente PIX, cartão de crédito e Mercado Pago",
            },
            {
              question: "Quanto tempo demora para receber o QR Code no e-mail",
              answer:
                "Pagamentos por cartão de crédito e Mercado Pago ficam prontos na hora. Pelo PIX pode demorar até 15 minutos.",
            },
            {
              question:
                "Como posso entrar em contato com o suporte ao cliente?",
              answer:
                "Pode entrar em contato através do e-mail lopesjean81@gmail.com",
            },
          ].map((faq, index) => (
            <Accordion data={faq} key={index} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto px-12 py-12 border-t border-primary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Gift className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-text">giftmind</span>
            </div>
            <p className="text-title">
              Eternize quem é especial pra você com seu livro de memórias.
            </p>
            <p className="text-text">
              Copyright © 2024 - Todos os direitos reservados
            </p>
            <div
              className="flex items-center justify-center bg-black/10 gap-3 
              text-text text-sm border p-2 rounded-lg w-3/4"
            >
              <span>Feito por Jean Carlos</span>
              <Image
                src="/profile.jpg"
                width={24}
                height={24}
                alt="Jean Carlos"
                className="rounded-full bg-white"
              />
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-text">Me siga no</span>
              <Link href="#" className="text-text hover:underline">
                <FaInstagram />
              </Link>
              <Link href="#" className="text-text hover:underline">
                <FaSquareXTwitter />
              </Link>
            </div>
          </div>
          <div className="md:ml-auto">
            {/* <div>
            <h3 className="text-lg font-semibold mb-4 text-title">
              OUTROS PROJETOS
            </h3>
            <ul className="space-y-2 text-text">
              {[
                "Checklist para casais",
                "Template SaaS",
                "Koynonya",
                "MyVendas",
                "Court Kings 3D",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-text hover:underline hover:underline-offset-4"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-text">LEGAL</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-text hover:underline hover:underline-offset-4"
                  >
                    Termos de uso
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-text hover:underline hover:underline-offset-4"
                  >
                    Termos de privacidade
                  </Link>
                </li>
                {/* <li className="text-text">CNPJ: 52.236.286/0001-02</li> */}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
