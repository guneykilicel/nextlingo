import { useTranslations } from "next-intl";
import Link from "next/link"
import LocalSwitcher from "./LocaleSwitcher";

export const Header = () => {
    const t = useTranslations("Navigation");
  return (
    <header className="p-4">
        <nav className="flex items-center justify-between">
            <Link href='/'>{t('home')}</Link>
            <LocalSwitcher />
        </nav>
    </header>
  )
}
