'use client';

import { ScrollToTopButton } from '@components/global/ScrollToTopButton';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { LANGUAGE_NAMES, MENU_ITEMS, SOCIAL_LINKS } from '@lib/constants';
import { useInView } from '@lib/hooks';
import { getPathname, Link, usePathname, useRouter } from '@lib/i18n/navigation';
import { cn } from '@lib/utils';
import { type Locale, useTranslations } from 'next-intl';
import Image from 'next/image';
import {
    type ChangeEventHandler,
    type FormEventHandler,
    Fragment,
    type FunctionComponent,
    type PropsWithChildren,
    useCallback,
    useState
} from 'react';
import { RiTranslate2 } from 'react-icons/ri';

export const Footer: FunctionComponent = () => {
    const { ref, inView: showScrollToTop } = useInView();
    const t = useTranslations('Footer')

    return (
        <Fragment>
            <ScrollToTopButton hidden={!showScrollToTop} />
            <footer
                ref={ref}
                className="w-full h-max px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 pt-12 md:pt-20 xl:pt-24 max-md:text-center bg-primary/5 clipped-wave-200 md:clipped-wave-400 xl:clipped-wave-500"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-16 lg:gap-x-32 gap-y-8 w-full pb-16">
                    <section className="flex flex-col gap-8 max-md:items-center">
                        <Image
                            src="/logo_line.png"
                            alt="Logo du Forum INSA"
                            width={256}
                            height={44}
                        />
                        <p>
                            Le Forum INSA est un événement annuel organisé par les étudiants de l&apos;INSA Toulouse, visant à
                            connecter les étudiants avec des entreprises et à promouvoir les opportunités professionnelles.
                            Pour plus d&apos;informations, contactez-nous via le formulaire de contact.
                        </p>
                    </section>
                    <FooterSection title={t('pages')}>
                        <FooterPagesList />
                    </FooterSection>
                    <FooterSection title={t('contactUs')}>
                        <FooterContactForm />
                    </FooterSection>
                    <div className="flex flex-col max-md:items-center gap-y-16">
                        <FooterSection title={t('followUs')}>
                            <FooterSocialLinks/>
                        </FooterSection>
                        <FooterLanguageSelector />
                    </div>
                </div>
                <hr />
                <FooterCopyRight />
            </footer>
        </Fragment>
    );
};

interface FooterSectionProps extends PropsWithChildren {
    title: string;
}

const FooterSection: FunctionComponent<FooterSectionProps> = ({ title, children }) => {
    return (
        <section className="space-y-4">
            <h3>{title}</h3>
            {children}
        </section>
    );
};

const FooterPagesList: FunctionComponent = () => {
    const t = useTranslations('Navigation');
    
    return (
        <nav>
            <ul className="space-y-4">
                {
                    MENU_ITEMS.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className="text-lg hover:text-primary hover:font-semibold"
                            >
                                {
                                    // @ts-expect-error TS2345: Argument of type string is not assignable to parameter of type ...
                                    t(item.label)
                                }
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
}

const FooterContactForm: FunctionComponent = () => {
    const router = useRouter();
    const t = useTranslations('FooterContactForm');
    
    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((event) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        
        const email = formData.get('email') as string;
        
        const contactUrl = new URL(
            MENU_ITEMS.find((item) => item.label === 'contact')?.href ?? '/contact',
            window.location.origin
        );
        contactUrl.searchParams.set('email', email);
        
        router.push(contactUrl.toString());
    }, [router]);
    
    return (
        <Form
            onSubmit={handleSubmit}
            className="flex flex-col max-md:items-center gap-4 w-full *:w-60"
        >
            <Input
                name="email"
                type="email"
                variant="faded"
                isRequired
                placeholder={t('emailPlaceholder')}
                errorMessage= {t('emailErrorMessage')}
            />
            <Button
                name="submit"
                type="submit"
                variant="solid"
                color="primary"
                fullWidth
                className="text-white"
            >
                {t('cta')}
            </Button>
        </Form>
    );
};

const FooterSocialLinks: FunctionComponent = () => {
    return (
        <ul className="flex flex-wrap max-md:justify-center gap-8">
            {
                SOCIAL_LINKS.map((socialLink) => {
                    const Icon = socialLink.icon;

                    return (
                        <li key={socialLink.href}>
                            <Link
                                href={socialLink.href}
                                target="_blank"
                                className="group"
                            >
                                <Icon className={cn('size-12', `group-hover:text-[${socialLink.color}]`)}/>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    );
};

const FooterLanguageSelector: FunctionComponent = () => {
    const router = useRouter();
    const href = usePathname();
   
    const t = useTranslations('FooterLanguageSelector');
    
    const handleLanguageChange = useCallback<ChangeEventHandler<HTMLSelectElement>>((event) => {
        const locale = event.target.value as Locale;
        
        const pathname = getPathname({ href, locale });
        
        router.replace(pathname);
    }, [router, href]);
    
    return (
        <Select
            aria-label={t('label')}
            variant="underlined"
            selectionMode="single"
            color="primary"
            className="w-60 hidden"
            startContent={<RiTranslate2 className="size-8"/>}
            onChange={handleLanguageChange}
        >
            {
                Object.entries(LANGUAGE_NAMES).map(([language, name]) => (
                    <SelectItem
                        key={language}
                        className="text-lg"
                    >
                        {name}
                    </SelectItem>
                ))
            }
        </Select>
    );
}

const FooterCopyRight: FunctionComponent = () => {
    const [currentYear] = useState(() => new Date().getFullYear());
    const t = useTranslations('Footer');

    return (
        <section className="w-full py-8">
            <p className="text-sm">
                Copyright &copy; {currentYear} - Forum INSA. {t('allRightsReserved')}
            </p>
        </section>
    );
};
