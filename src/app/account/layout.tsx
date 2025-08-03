import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Account - Mobile Armour",
    description: "Login or register for Mobile Armour",
};

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                {children}
            </div>
        </div>
    );
}
