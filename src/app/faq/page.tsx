import { fetchFaqs } from "@/services/api";

async function page() {
    const { items, generatedAt } = await fetchFaqs();

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Frequently Asked Questions</h1>
            <p style={{ color: "gray" }}>
                Page generated at: <strong>{generatedAt}</strong>
            </p>
            <hr />

            {items.map((post: any) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </main>
    );
}

export default page;
