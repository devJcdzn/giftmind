import { Gift } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaSquareXTwitter } from "react-icons/fa6";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={`mx-auto px-12 py-12 border-t border-primary ${className}`}
    >
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
  );
};
