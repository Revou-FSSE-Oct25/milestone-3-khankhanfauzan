import { User } from "@/lib/definitions";
import { Category, Product, ProductPayload } from "../types/product";

const STORE_API = "https://api.escuelajs.co/api/v1";
const JSON_API = "https://jsonplaceholder.typicode.com";

export const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${STORE_API}/products`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
};

export const fetchProductById = async (id: number): Promise<Product> => {
    const res = await fetch(`${STORE_API}/products/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Product not found");

    return res.json();
};

export const fetchProductsByCategory = async (
    id: number,
): Promise<Product[]> => {
    const res = await fetch(`${STORE_API}/categories/${id}/products`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Product by category not found");

    return res.json();
};

export const fetchProductByTitle = async (
    title: string,
): Promise<Product[]> => {
    const res = await fetch(`${STORE_API}/products/?title=${title}`);

    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
};

export const fetchProductPagination = async (
    offset: number,
    limit: number,
): Promise<Product[]> => {
    const res = await fetch(
        `${STORE_API}/products?offset=${offset}&limit=${limit}`,
    );

    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
};

export const createProduct = async (
    payload: ProductPayload,
): Promise<Product> => {
    const res = await fetch(`${STORE_API}/products/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create product");
    return res.json();
};

export const updateProductById = async (
    id: number,
    payload: ProductPayload,
): Promise<Product> => {
    const res = await fetch(`${STORE_API}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to update product");
    return res.json();
};

export const deleteProductById = async (id: number) => {
    const res = await fetch(`${STORE_API}/products/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete product");

    return res.json();
};

export const fetchCategories = async (): Promise<Category[]> => {
    const res = await fetch(`${STORE_API}/categories`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
};

export const fetchCategoryById = async (id: number): Promise<Category> => {
    const res = await fetch(`${STORE_API}/categories/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Category not found");

    return res.json();
};

export const createCategory = async (payload: {
    name: string;
    image: string;
}): Promise<Category> => {
    const res = await fetch(`${STORE_API}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to create category");

    return res.json();
};

export const updateCategoryById = async (
    id: number,
    payload: { name: string; image: string },
): Promise<Category> => {
    const res = await fetch(`${STORE_API}/categories/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to update category");

    return res.json();
};

export const deleteCategoryById = async (id: number) => {
    const res = await fetch(`${STORE_API}/categories/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete category");

    return res.json();
};

export const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch(`${STORE_API}/users`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
};

export const fetchUserById = async (id: number): Promise<User> => {
    const res = await fetch(`${STORE_API}/users/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("User not found");

    return res.json();
};

export const createUser = async (payload: {
    name: string;
    email: string;
    password: string;
    avatar: string;
    role: "customer" | "admin";
}): Promise<User> => {
    const res = await fetch(`${STORE_API}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to create user");

    return res.json();
};

export const updateUserById = async (
    id: number,
    payload: { email: string; name: string; role: "customer" | "admin" },
): Promise<User> => {
    const res = await fetch(`${STORE_API}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to update user");

    return res.json();
};

export const checkUserEmailAvailability = async (
    email: string,
): Promise<{ isAvailable: boolean }> => {
    const res = await fetch(`${STORE_API}/users/is-available`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error("Failed to check email availability");

    return res.json();
};

export const deleteUserById = async (id: number) => {
    const res = await fetch(`${STORE_API}/users/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete user");

    return res.json();
};

export const fetchFaqs = async () => {
    const res = await fetch(`${JSON_API}/posts?_limit=10`, {
        cache: "force-cache",
    });

    if (!res.ok) throw new Error("Failed to fetch FAQs");
    const data = await res.json();

    return { items: data, generatedAt: new Date().toLocaleString() };
};
