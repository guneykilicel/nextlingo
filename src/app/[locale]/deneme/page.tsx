"use client";
import axios from 'axios';
import { useLocale } from 'next-intl';
import React, { useState, useEffect } from 'react';

interface Content {
    type: string;
    children: Array<{
        type: string;
        text: string;
    }>;
}

interface ProductAttributes {
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    content: Content[];
    locale: string;
}

interface Product {
    id: number;
    attributes: ProductAttributes;
}

interface DataResponse {
    data: Product[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

const Deneme: React.FC = () => {
    const locale = useLocale();
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get<DataResponse>(`http://localhost:1337/api/products?locale=${locale}`);
                setProducts(res.data.data);
                setError(null);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [locale]); // locale değiştiğinde fetchData çağrılır

    const renderContent = (content: Content[]) => {
        return content.map((block, index) => {
            if (block.type === 'paragraph') {
                return (
                    <p key={index}>
                        {block.children.map((child, idx) => child.text).join('')}
                    </p>
                );
            }
            return null;
        });
    };

    return (
        <div>
            <h1>Products List</h1>
            {error && <p>Error: {JSON.stringify(error)}</p>}
            {products.length === 0 ? (
                <p>No products available</p>
            ) : (
                products.map((product) => (
                    <div key={product.id}>
                        <h2>{product.attributes.title}</h2>
                        <div>{renderContent(product.attributes.content)}</div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Deneme;
