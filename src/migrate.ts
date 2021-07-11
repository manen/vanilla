import { nanoid } from 'nanoid';

export type Version = '1' | '2';
const legacy: Version = '1';
const two: Version = '2';

const current: Version = two;

interface MigratableItem {
	name: string;
	amount: number;
	unit: string;
}
interface MigratableCategory {
	name: string;
	items: MigratableItem[];
	categories: MigratableCategory[];
}
interface MigratableData {
	main: {
		items: MigratableItem[];
		categories: MigratableCategory[];
	};
}

function getVersion(): Version {
	return (localStorage.getItem('storage-version') as Version) || current;
}

export function didJustMigrate(): boolean {
	const migrated = localStorage.getItem('storage-migrated') == '1';
	if (migrated) {
		localStorage.removeItem('storage-migrated');
	}

	return migrated;
}
export function migrateIfNeeded(): boolean {
	const actual = getVersion();
	if (actual == current) {
		return false;
	} else {
		migrate(actual, current);
		localStorage.setItem('storage-version', current);
		localStorage.setItem('storage-migrated', '1');
		return true;
	}
}
function migrate(from: Version, to: Version) {
	const data = getCurrent(from);
	localStorage.clear();

	toCurrent(to, data);
}
function getCurrent(version: Version): MigratableData {
	switch (version) {
		case legacy:
			return {
				main: {
					items: [],
					categories: JSON.parse(localStorage.getItem('list') || '[]').map(
						(id: string) => {
							const c = JSON.parse(
								localStorage.getItem(`category-${id}`) || '{}'
							);
							return {
								...c,
								categories: [],
								items: c.items.map((id: string) =>
									JSON.parse(localStorage.getItem(`item-${id}`) || '{}')
								),
							};
						}
					),
				},
			};
		case two:
			const mainRaw = JSON.parse(localStorage.getItem('data-main') || '{}');
			function serializeList({
				items,
				categories,
			}: {
				items: string[];
				categories: string[];
			}): {
				items: MigratableItem[];
				categories: MigratableCategory[];
			} {
				return {
					items: items.map((id) =>
						JSON.parse(localStorage.getItem(`data-item-${id}`) || '{}')
					),
					categories: categories.map((id) => {
						const data = JSON.parse(
							localStorage.getItem(`data-category-${id}`) || '{}'
						);
						const list = serializeList(data);
						return {
							...data,
							list,
						};
					}),
				};
			}

			return {
				main: {
					...mainRaw,
					categories: mainRaw.categories.map((id: string) => {
						const data = JSON.parse(
							localStorage.getItem(`data-category-${id}`) || '{}'
						);
						const list = serializeList(data);
						return { ...data, list };
					}),
				},
			};

		default:
			return { main: { items: [], categories: [] } };
			break;
	}
}
function toCurrent(to: Version, data: MigratableData) {
	switch (to) {
		case two:
			function deserializeCategory(c: MigratableCategory): string {
				const id = nanoid();
				localStorage.setItem(
					`data-category-${id}`,
					JSON.stringify({
						...c,
						items: c.items.map((i) => {
							const id = nanoid();
							localStorage.setItem(`data-item-${id}`, JSON.stringify(i));
							return id;
						}),
						categories: c.categories.map(deserializeCategory),
					})
				);
				return id;
			}
			localStorage.setItem(
				'data-main',
				JSON.stringify({
					...data.main,
					items: data.main.items.map((i) => {
						const id = nanoid();
						localStorage.setItem(`data-item-${id}`, JSON.stringify(i));
					}),
					categories: data.main.categories.map(deserializeCategory),
				})
			);
			break;
	}
}
