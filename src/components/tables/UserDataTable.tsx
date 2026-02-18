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
import { deleteProductById, fetchUsers } from "@/services/api";
import SafeImage from "@/components/common/SafeImage";
import MoreActionsButton from "@/components/buttons/MoreActionsButton";
import Link from "next/link";

async function UserDataTable() {
    const users = await fetchUsers();

    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <Input
                    id="search-input"
                    placeholder="Search..."
                    type="search"
                />
                <Link href="/admin/users/add">
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
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className=" text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="whitespace-nowrap">
                                    {user.id}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    {user.name}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    {user.email}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    <SafeImage
                                        className="rounded-sm"
                                        src={user.avatar}
                                        alt={user.name}
                                        width={48}
                                        height={48}
                                    />
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                    {user.role}
                                </TableCell>
                                <TableCell className="text-right">
                                    <MoreActionsButton
                                        id={user.id}
                                        route="/admin/users"
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

export default UserDataTable;
