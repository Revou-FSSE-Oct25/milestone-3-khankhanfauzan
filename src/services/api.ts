import axios from "axios";
import { Category, Product } from "../types/product";
import { LoginResponse, UserProfile } from "@/types/auth";
import { storage } from "@/services/storage";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Products

export const fetchProducts = async (): Promise<Product[]> => {
    const { data } = await api.get("/products");
    return data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};

// Categories

export const fetchCategories = async (): Promise<Category[]> => {
    const { data } = await api.get("/categories");
    return data;
};

export const fetchCategoryById = async (id: number): Promise<Category> => {
    const { data } = await api.get(`/categories/${id}`);
    return data;
};

// Auth

export const loginUser = async (credential: any): Promise<LoginResponse> => {
    const { data } = await api.post("/auth/login", credential);
    return data;
};

export const fetchUserProfile = async (): Promise<UserProfile> => {
    const token = storage.getToken();
    const { data } = await api.get("/auth/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};
