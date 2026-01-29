import FAQCard from "@/components/FAQCard";
import { fetchFaqs } from "@/services/api";
import { FAQ } from "@/types/faq";

async function page() {
    const { items, generatedAt } = await fetchFaqs();

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Frequently Asked Questions</h1>
            <p style={{ color: "gray" }}>
                Page generated at: <strong>{generatedAt}</strong>
            </p>
            <hr />

            <div className="w-full mt-8">
                {items.map((post: FAQ) => (
                    <FAQCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}

export default page;
