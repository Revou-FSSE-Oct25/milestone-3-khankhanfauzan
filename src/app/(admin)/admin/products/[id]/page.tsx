import AppProductForm from "@/components/product/AppProductForm";
import { fetchProductById } from "@/services/api";
import { Props } from "@/types/param";

async function page(props: Props) {
    const { id } = await props.params;
    const product = await fetchProductById(Number(id));

    return (
        <div className="max-w-7xl p-4">
            <AppProductForm product={product} />
        </div>
    );
}

export default page;
