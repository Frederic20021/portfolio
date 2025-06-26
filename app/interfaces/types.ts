export interface Plan {
    name: string;
    price: string;
    features: string[];
    isPopular?: boolean;
}

export interface FormData {
    name: string;
    email: string;
    level: string;
    message: string;
}