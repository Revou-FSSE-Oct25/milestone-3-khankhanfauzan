import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fetchProducts, deleteProductById } from "@/services/api";
import SafeImage from "@/components/common/SafeImage";
import MoreActionsButton from "@/components/buttons/MoreActionsButton";
import Link from "next/link";

async function ProductDataTable() {
    const products = await fetchProducts();

    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <Input
                    id="search-input"
                    placeholder="Search..."
                    type="search"
                />
                <Link href="/admin/products/add">
                    <Button variant={"outline"}>
                        <PlusIcon />
                        <span>Add Product</span>
                    </Button>
                </Link>
            </div>
            <div className="mt-8 rounded-md border overflow-x-auto">
                <Table className="min-w-180 w-full table-auto">
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead className="w-20">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="w-30">Price</TableHead>
                            <TableHead className="w-30">Images</TableHead>
                            <TableHead className="w-40">Category</TableHead>
                            <TableHead className="w-30 text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="whitespace-nowrap">
                                    {product.id}
                                </TableCell>
                                <TableCell className="max-w-65 truncate">
                                    {product.title}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    ${product.price}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    <SafeImage
                                        className="rounded-sm"
                                        src={product.images[0]}
                                        alt={product.title}
                                        width={48}
                                        height={48}
                                    />
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    {product.category.name}
                                </TableCell>
                                <TableCell className="text-right">
                                    <MoreActionsButton
                                        id={product.id}
                                        route="/admin/products"
                                        onDelete={deleteProductById}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default ProductDataTable;
