import { FAQ } from "@/types/faq";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronDownIcon } from "lucide-react";

interface FAQCardProps {
    post: FAQ;
}

function FAQCard({ post }: FAQCardProps) {
    return (
        <div className="p-2 border mb-2 rounded-lg w-full overflow-hidden">
            <Collapsible>
                <CollapsibleTrigger className="w-full">
                    <div className="p-2 hover:bg-neutral-900 rounded-sm w-full flex justify-between items-center">
                        <h3 className="text-start w-full font-semibold">
                            {post.title}
                        </h3>
                        <ChevronDownIcon />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 p-2 border-t">
                    <p className="text-neutral-400">{post.body}</p>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}

export default FAQCard;
