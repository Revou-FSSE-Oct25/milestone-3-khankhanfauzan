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
import { fetchCategories } from "@/services/api";
import SafeImage from "@/components/common/SafeImage";
import MoreActionsButton from "@/components/buttons/MoreActionsButton";
import Link from "next/link";

async function CategoryDataTable() {
    const categories = await fetchCategories();

    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <Input
                    id="search-input"
                    placeholder="Search..."
                    type="search"
                />
                <Link href="/admin/categories/add">
                    <Button variant={"outline"}>
                        <PlusIcon />
                        <span>Add Category</span>
                    </Button>
                </Link>
            </div>
            <div className="mt-8 rounded-md border overflow-x-auto">
                <Table className="min-w-180 w-full table-auto">
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="whitespace-nowrap">
                                    {category.id}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    {category.name}
                                </TableCell>

                                <TableCell className="whitespace-nowrap">
                                    <SafeImage
                                        className="rounded-sm aspect-square"
                                        src={category.image}
                                        alt={category.name}
                                        width={48}
                                        height={48}
                                    />
                                </TableCell>

                                <TableCell className="text-right">
                                    <MoreActionsButton
                                        id={category.id}
                                        route="/admin/categories"
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

export default CategoryDataTable;
