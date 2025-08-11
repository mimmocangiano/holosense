import contacts from "@/content/global/contacts.json";
import footerEn from "@/content/global/en/footer.json";
import headerEn from "@/content/global/en/header.json";
import seoEn from "@/content/global/en/seo.json";
import footerJa from "@/content/global/ja/footer.json";
import headerJa from "@/content/global/ja/header.json";
import seoJa from "@/content/global/ja/seo.json";
import style from "@/content/global/style.json";
import widget from "@/content/global/widget.json";
import backgroundImage from "@/content/global/background-image.json";
import { defaultLocale, locales } from "site.config";

const settings: Record<string, LocalizedSettings> = {
    en: {
		header: headerEn,
		footer: footerEn,
		contacts: contacts,
		seo: seoEn,
		style: style,
		widget: widget,
	},
    ja: {
        header: headerJa,
        footer: footerJa,
        contacts: contacts,
        seo: seoJa,
        style: style,
        widget: widget,
    },
};

export function getLocalizedSettings(locale?: string): LocalizedSettings {
	return settings[locale ?? defaultLocale] ?? settings[defaultLocale];
}

export function isLocalizedUrl(url: string): boolean {
	const urlParts = url.split("/");
	const firstPart = urlParts[1];
	return locales.includes(firstPart);
}

export function unlocalizedUrl(url: string): string {
	if (isLocalizedUrl(url)) {
		const urlParts = url.split("/").filter((part) => part !== "");
		// Remove the locale part
		urlParts.shift();
		// Rejoin the parts and ensure a leading slash
		const unlocalizedPath = `/${urlParts.join("/")}`;
		return unlocalizedPath === "//" ? "/" : unlocalizedPath;
	}
	return url;
}

export function translatePath(l: string, path: string) {
	return l === defaultLocale ? path : `/${l}${path}`;
}

export function getBackgroundImageSettings() {
	return backgroundImage;
}
