import React from 'react';
import { createClient } from '@/prismicio';
import Link from 'next/link';
import { PrismicNextLink } from '@prismicio/next';
import NavBar from './Navbar';

export default async function Header(){
    const client = createClient();
    const settings = await client.getSingle('settings');
    return (
        <header className='top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4'>
        {/* <nav className="mb-0 pb-0">
            <ul>
                <li>
                    <Link href='/' aria-label='homepage'>
                    {settings.data.name}
                    </Link>
                </li>
                {settings.data.nav_item.map(({link, label}, index)=> (
                  <li key={index}>
                    <PrismicNextLink field={link}>
                        {label}
                    </PrismicNextLink>
                  </li>
                ))}
                
            </ul>
        </nav> */}
        <NavBar settings={settings}/>
        </header>
    )
}