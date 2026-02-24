 "use client";

 import { Button } from "@/components/ui/button";
 import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
 import { Input } from "@/components/ui/input";
 import SafeImage from "@/components/common/SafeImage";
 import { useForm } from "react-hook-form";
 import { useRouter } from "next/navigation";
 import { useState } from "react";
 import { Category } from "@/types/product";
 import { updateCategoryById } from "@/services/api";

 type CategoryFormValues = {
     name: string;
     image: string;
 };

 function EditCategoryForm({ category }: { category: Category }) {
     const [isLoading, setIsLoading] = useState(false);
     const router = useRouter();

     const {
         register,
         handleSubmit,
         formState: { errors },
         watch,
     } = useForm<CategoryFormValues>({
         defaultValues: {
             name: category.name,
             image: category.image,
         },
     });

     const imageValue = watch("image") || "";

     const onSubmitForm = async (data: CategoryFormValues) => {
         const trimmedImage = data.image.trim();

         const payload = {
             name: data.name,
             image: trimmedImage,
         };

         try {
             setIsLoading(true);
             await updateCategoryById(category.id, payload);
             router.push("/admin/categories");
         } catch (error) {
             setIsLoading(false);
             console.error(error);
         }
     };

     return (
         <form onSubmit={handleSubmit(onSubmitForm)}>
             <FieldGroup>
                 <Field>
                     <FieldLabel htmlFor="name">Name</FieldLabel>
                     <Input
                         id="name"
                         type="text"
                         placeholder="category name"
                         title="please enter a category name"
                         {...register("name", {
                             required: "Name is required",
                             minLength: {
                                 value: 3,
                                 message: "Name must be at least 3 characters",
                             },
                         })}
                     />
                     {errors.name && (
                         <div className="text-sm text-red-500 mt-1">
                             {errors.name.message}
                         </div>
                     )}
                 </Field>

                 <Field>
                     <FieldLabel htmlFor="image">Image</FieldLabel>

                     <div className="flex items-center gap-2">
                         {imageValue.trim() && (
                             <SafeImage
                                 src={imageValue.trim()}
                                 width={64}
                                 height={64}
                                 className="rounded-sm border border-neutral-800 object-cover aspect-square"
                             />
                         )}
                         <Input
                             id="image"
                             type="url"
                             placeholder="https://placehold.co/600x400"
                             title="please enter an image URL"
                             {...register("image", {
                                 required: "Image URL is required",
                             })}
                         />
                     </div>
                     {errors.image && (
                         <div className="text-sm text-red-500 mt-1">
                             {errors.image.message}
                         </div>
                     )}
                 </Field>

                 <Button type="submit" disabled={isLoading}>
                     {isLoading ? "Updating..." : "Update Category"}
                 </Button>
             </FieldGroup>
         </form>
     );
 }

 export default EditCategoryForm;

