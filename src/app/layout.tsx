import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import AppRedirect from '@/components/AppRedirect/page';
import Footer from '@/components/Footer/page';
import MainHeader from '@/components/MainHeader/page';
import { Toaster } from '@/components/ui/sonner';
import AppProvider from '@/redux/provider';

import './globals.css';

const roboto = Roboto({
    weight: ['400', '500', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['greek']
});

export const metadata: Metadata = {
    title: 'Ali | Buy anything from anywhere',
    icons: '/images/brand-logo.png',
    keywords: ['online marketplace', 'global trade', 'wholesale', 'b2b ecommerce'],
    robots: 'index, follow',
    description:
        'Find quality Manufacturers, Suppliers, Exporters, Importers, Buyers, Wholesalers, Products and Trade Leads from our award-winning International Trade Site. Import & Export on alibaba.com',
    openGraph: {
        title: 'Ali | Buy anything in anywhere',
        description:
            'Find quality Manufacturers, Suppliers, Exporters, Importers, Buyers, Wholesalers, Products and Trade Leads from our award-winning International Trade Site. Import & Export on alibaba.com',
        url: 'https://ali-eco.vercell.app',
        siteName: 'Ali',
        images: [
            {
                url: 'https://ali-eco.vercell.app/images/brand-logo.png',
                width: 800,
                height: 600
            }
        ],
        locale: 'en_US',
        type: 'website'
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <AppProvider>
                    <AppRedirect>
                        <MainHeader />
                        {children}
                        <Footer />
                        <Toaster />
                    </AppRedirect>
                </AppProvider>
            </body>
        </html>
    );
}
