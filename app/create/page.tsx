"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Preview } from "@/components/preview";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/upload-image-input";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCreatePage } from "@/features/page/api/use-create-page";
import { useToast } from "@/hooks/use-toast";

interface ImageData {
  url: string;
  description: string;
}

const plans = [
  { id: "basic", name: "1 ano, 7 páginas, Web - R$9", maxPhotos: 7 },
  {
    id: "standard",
    name: "Pra sempre, 10 páginas, Web & PDF - R$19",
    maxPhotos: 10,
  },
];

const stringNormalizer = z
  .string()
  .min(1, "O valor não pode estar vazio")
  .transform(
    (value) =>
      value
        .normalize("NFD") // Normaliza para separar os caracteres acentuados
        .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
        .replace(/ç/g, "c") // Substitui 'ç' por 'c'
        .replace(/\s+/g, "-") // Substitui espaços por hífens
        .toLowerCase() // Converte para minúsculas
        .replace(/[^a-z0-9-]/g, "") // Remove caracteres especiais
  );

const formSchema = z.object({
  name: stringNormalizer,
  message: z.string().optional(),
  plan: z.string(),
  color: z.string().default("primary").optional(),
  icon: z.string().default("heart").optional(),
  images: z
    .array(
      z.object({
        file: z.instanceof(File),
        description: z.string().optional(),
      })
    )
    .max(10, "Limite de 10 fotos"),
});

type FormData = z.infer<typeof formSchema>;

export default function CreatePage() {
  const { toast } = useToast();

  const [maxPhotos, setMaxPhotos] = useState(7);

  const [pages, setPages] = useState<ImageData[]>([]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: plans[0].id,
      images: [],
    },
  });

  const selectedColor = form.watch("color");
  const selectedIcon = form.watch("icon");

  const pageMutation = useCreatePage();

  const handleSubmit = async (data: FormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("message", data.message || "");
    formData.append("plan", data.plan);
    formData.append("color", data.color || "primary");
    formData.append("icon", data.icon || "heart");

    data.images.forEach((image, index) => {
      formData.append(`images[${index}][file]`, image.file);
      formData.append(`images[${index}][description]`, image.description || "");
    });

    const response = await pageMutation.mutateAsync(formData);

    if (response) {
      const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${response.name}`;

      navigator.clipboard
        .writeText(pageUrl)
        .then(() => {
          toast({
            title: "URL Copiada para ára de transferência",
            description: pageUrl,
          });
        })
        .catch((err) => {
          toast({
            title: "Erro ao copiar URL",
            description: err,
            variant: "destructive",
          });
        });
    }
  };

  const handlePlanChange = (planId: string) => {
    const plan = plans.find((p) => p.id === planId);
    if (plan) {
      setMaxPhotos(plan.maxPhotos);
    }
  };

  const handleImageChange = (images: File[] | null) => {
    setUploadedImages(images || []);
  };

  const onDescriptionChange = (description: string, index: number) => {
    const pageDescriptions = [...descriptions];
    pageDescriptions[index] = description;
    setDescriptions(pageDescriptions);
  };

  useEffect(() => {
    // Construa os URLs e atualize `pages` apenas quando `uploadedImages` mudar
    const pagesData = uploadedImages.map((image, index) => ({
      url: URL.createObjectURL(image),
      description: descriptions[index],
    }));

    setPages(pagesData);
    form.setValue(
      "images",
      uploadedImages.map((image, index) => ({
        file: image,
        description: descriptions[index] || "",
      }))
    );
    return () => {
      pagesData.forEach((page) => URL.revokeObjectURL(page.url));
    };
  }, [uploadedImages, form, descriptions]);

  useEffect(() => {
    const selectedPlan = form.getValues("plan");
    handlePlanChange(selectedPlan);
  }, [form.watch("plan")]);

  return (
    <div className="lg:max-w-6xl mx-auto mb-10 lg:mb-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-screen-xl mx-auto mt-5"
        >
          <div className="w-full flex flex-col lg:flex-row items-start gap-20">
            <div className="w-[90%] lg:w-2/3 mx-auto flex gap-4 flex-col justify-center">
              <div className="flex flex-col gap-2 mb-5">
                <h1 className="text-5xl font-bold mt-5 lg:mt-0 text-title">
                  Crie agora seu livro!
                </h1>
                <h2>Crie as páginas com fotos e mensagens.</h2>
              </div>
              <div className="w-full">
                <FormField
                  name="plan"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Escolha o melhor para você</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handlePlanChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o melhor para você" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {plans.map((plan) => (
                            <SelectItem key={plan.id} value={plan.id}>
                              {plan.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col lg:flex-row items-end gap-1 lg:gap-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-[50%]">
                      <FormLabel>Nome do livro</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean" {...field} type="text" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="message"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-[50%]">
                      <FormLabel>Mensagem para o leitor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nossas lembranças"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-full justify-center space-x-4">
                {["heart", "sun", "thumb-up"].map((icon) => (
                  <Button
                    key={icon}
                    type="button"
                    onClick={() => form.setValue("icon", icon)}
                    className={cn(
                      "p-6 rounded-full bg-white hover:bg-white border-2 overflow-hidden",
                      icon === selectedIcon ? "border-black" : "border-border"
                    )}
                  >
                    <Image
                      src={
                        icon === "heart"
                          ? "/3d-heart.png"
                          : icon === "sun"
                          ? "/3d-sun.png"
                          : "/3d-thumb-up.png"
                      }
                      alt={icon}
                      width={40}
                      height={40}
                      className="size-8 object-cover"
                    />
                  </Button>
                ))}
              </div>

              <ImageUpload
                onChange={handleImageChange}
                photoLimit={maxPhotos}
              />
              <Collapsible className="space-y-4">
                <div className="flex items-center justify-between space-x-4 px-4">
                  <h4 className="text-base font-semibold">
                    Adicione as mensagens das suas páginas
                  </h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronsUpDown className="size-4" />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                {uploadedImages.map((_, index) => (
                  <CollapsibleContent key={index} className="md:px-6">
                    <div className="grid w-full gap-2">
                      <Label htmlFor={`description-${index}`}>
                        Mensagem da página {index + 1}
                      </Label>
                      <Textarea
                        onBlur={(e) =>
                          onDescriptionChange(e.target.value, index)
                        }
                        placeholder="Sua mensagem aqui"
                        id={`description-${index}`}
                      />
                    </div>
                  </CollapsibleContent>
                ))}
              </Collapsible>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col gap-3 items-center justify-center">
              <span>Pré-visualização</span>
              <Preview
                images={pages}
                message={form.watch("message")}
                disabled={false}
                name={form.watch("name")}
                color={selectedColor}
                icon={selectedIcon}
              />

              <div className="flex space-x-4">
                {["primary", "blue", "violet"].map((color) => (
                  <Button
                    key={color}
                    type="button"
                    onClick={() => form.setValue("color", color)}
                    className={cn(
                      "size-10 rounded-full border-2",
                      color === selectedColor
                        ? "border-black"
                        : "border-border",
                      {
                        "bg-primary hover:bg-primary": color === "primary",
                        "bg-blue-400 hover:bg-blue-400": color === "blue",
                        "bg-violet-500 hover:bg-violet-500": color === "violet",
                      }
                    )}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={pageMutation.isPending}
                className="bg-primary text-white h-[75px] w-[90%] lg:w-[330px] rounded-lg shadow-xl disabled:bg-gray-700 flex items-center justify-center gap-2"
              >
                <div className="flex flex-col items-center">
                  <span className="font-bold">
                    {pageMutation.isPending ? "Carregando..." : "Criar agora!"}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
