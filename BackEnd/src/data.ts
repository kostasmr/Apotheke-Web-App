import { connect } from "mongoose";

export const sample_products: any[] = [
    {
        id: '1',
        name: 'computer',
        supplier: 'public',
        weight: 10,
        quantity: 10,
        bagQuantity: 0,
    },
    {
        id: '2',
        name: 'iPhone',
        supplier: 'public',
        weight: 2,
        quantity: 30,
        bagQuantity: 0,
    },
    {
        id: '3',
        name: 'chair',
        supplier: 'public',
        weight: 15,
        quantity: 12,
        bagQuantity: 0,
    },
    {
        id: '4',
        name: 'book',
        supplier: 'public',
        weight: 1,
        quantity: 50,
        bagQuantity: 0,
    },
];

export const sample_users: any[] = [
    {
        name: "Kostas Mourou",
        email: "ko@gmail.com",
        password: "123456",
        isAdmin: true,
    },
    {
        name: "Giannis Pap",
        email: "gp@gmail.com",
        password: "123456",
        isAdmin: true,
    },
];

export const sample_suppliers: any[] = [
    {
        name: "Public",
        code: "pb2023",
    },
];

export const sample_orders: any[] = [
    {
        supplier: "Public",
        supplier_code: "pb2023",
        products: [{name: "book",quantity: 3},{name: "computer",quantity: 3}],
        user: "ko@gmail.com"
    },
    {
        supplier: "Public",
        supplier_code: "pb2023",
        products: [{name: "book",quantity: 1},{name: "chair",quantity: 1}],
        user: "ko@gmail.com"
    },
    {
        supplier: "Public",
        supplier_code: "pb2023",
        products: [{name: "chair",quantity: 3},{name: "computer",quantity: 3}],
        user: "giorgos@gmail.com"
    },
];