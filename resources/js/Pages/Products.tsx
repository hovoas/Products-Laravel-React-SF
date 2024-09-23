import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

import { useDebounce } from "@/Hooks/useDebounce";

interface Product {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
}

interface ProductsProps {
    products: Product[];
    search: string;
}

export default function Products({ products, search }: ProductsProps) {
    const [searchQuery, setSearchQuery] = useState<string>(search || "");

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedSearchQuery !== search) {
            router.get(
                "/",
                { search: debouncedSearchQuery },
                { preserveState: true },
            );
        }
    }, [debouncedSearchQuery, search]);

    return (
        <>
            <header className="border-b-1 relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
                <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
                    <nav
                        aria-label="main navigation"
                        className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
                        role="navigation"
                    >
                        <a
                            aria-label="logo"
                            aria-current="page"
                            className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
                            href="#"
                        >
                            <img
                                src="/assets/logo.png"
                                title="logo"
                                width="60"
                                height="60"
                                className="max-w-full rounded-full shrink-0"
                            />
                        </a>
                        <div className="relative my-6">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="search"
                                    name="q"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Search here"
                                    aria-label="Search content"
                                    className="peer relative h-10 w-full border-b border-slate-200 px-4 pr-12 text-sm text-slate-500 outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-4 top-2.5 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    aria-hidden="true"
                                    aria-label="Search icon"
                                    role="graphics-symbol"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                            </form>
                        </div>
                    </nav>
                </div>
            </header>
            <section>
                <div className="container p-6 m-auto">
                    <div className="grid grid-cols-4 gap-8 md:grid-cols-8 lg:grid-cols-12">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div
                                    key={product.id}
                                    className="col-span-4 lg:col-span-3"
                                >
                                    <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 h-full">
                                        <figure>
                                            <img
                                                src={product.thumbnail}
                                                alt="card image"
                                                className="w-full"
                                            />
                                        </figure>
                                        <div className="p-6">
                                            <header className="mb-4">
                                                <h3 className="text-xl font-medium text-slate-700">
                                                    {product.title}
                                                </h3>
                                                <p className=" text-slate-400">
                                                    {" "}
                                                    {product.price}
                                                </p>
                                            </header>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span>No products found.</span>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
