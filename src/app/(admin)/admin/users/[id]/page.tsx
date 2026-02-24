import EditUserForm from "@/components/forms/user/EditUserForm";
import { fetchUserById } from "@/services/api";
import { Props } from "@/types/param";

async function page(props: Props) {
    const { id } = await props.params;
    const user = await fetchUserById(Number(id));

    return (
        <div className="p-4">
            <EditUserForm user={user} />
        </div>
    );
}

export default page;
