import { type ContentEntryMap, getCollection } from "astro:content";
import { type Locale, defaultLocale } from "site.config";

export async function getCollectionStaticPaths<CollectionName extends keyof ContentEntryMap>(
	collectionName: CollectionName,
	locale?: Locale,
): Promise<PathParams<CollectionName>[]> {
	const collection = await getCollection(collectionName);

	const visibleItems = collection.filter((item) => {
		return !item.data.hidden;
	});

	const paths = visibleItems.map((item) => {
		const [lang, ...slug] = item.slug.split("/");
		let localizedSlug = slug;

			if (collectionName === "pages") {
		// Handle homepage designation - homepage pages get their own slug
		if (item.data.isHomepage) {
			localizedSlug = slug; // Keep the slug for the homepage page
		} else if (slug[0] === "index") {
			localizedSlug = [];
		} else {
			localizedSlug = slug;
		}
	}

		if (lang !== defaultLocale && !locale) {
			localizedSlug = [lang, ...localizedSlug];
		}

		return {
			params: {
				lang,
				slug: localizedSlug.join("/") || undefined,
			},
			props: {
				data: item,
			},
		};
	});

	let pathsRes = paths;
	if (locale) {
		pathsRes = paths.filter((path) => path.params.lang === locale);
	}



	return pathsRes;
}
