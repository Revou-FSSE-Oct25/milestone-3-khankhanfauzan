import EditCategoryForm from "@/components/forms/category/EditCategoryForm";
import { fetchCategoryById } from "@/services/api";
import { Props } from "@/types/param";

async function page(props: Props) {
    const { id } = await props.params;
    const category = await fetchCategoryById(Number(id));

    return (
        <div className="p-4">
            <EditCategoryForm category={category} />
        </div>
    );
}

export default page;
