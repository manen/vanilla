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
	settings: {
		joinDate: number;
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
		localStorage.setItem('storage-version', current);
		return false;
	} else {
		migrate(actual, current);
		localStorage.setItem('storage-migrated', '1');
		localStorage.setItem('storage-version', current);
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
								items: c.items.map((id: string) => {
									const raw = JSON.parse(
										localStorage.getItem(`item-${id}`) || '{}'
									);
									return {
										...raw,
										amount: raw.amount || 1,
									};
								}),
							};
						}
					),
				},
				settings: {
					joinDate: JSON.parse(
						localStorage.getItem('settings-joined') || `${Date.now()}`
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
				console.log({
					items: items.map((id) =>
						JSON.parse(localStorage.getItem(`data-item-${id}`) || '{}')
					),
					categories: categories.map((id) => {
						const data = JSON.parse(
							localStorage.getItem(`data-category-${id}`) || '{}'
						);
						const list = serializeList(data);
						console.log({ ...data, list });
						return {
							...data,
							list,
						};
					}),
				});
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
							...list,
						};
					}),
				};
			}

			return {
				main: {
					...mainRaw,
					items: mainRaw.items.map((id: string) =>
						JSON.parse(localStorage.getItem(`data-item-${id}`) || '{}')
					),
					categories: mainRaw.categories.map((id: string) => {
						const data = JSON.parse(
							localStorage.getItem(`data-category-${id}`) || '{}'
						);
						const list = serializeList(data);
						return { ...data, ...list };
					}),
				},
				settings: {
					joinDate: JSON.parse(
						localStorage.getItem('settings-join-date') || `${Date.now()}`
					),
				},
			};

		default:
			return {
				main: { items: [], categories: [] },
				settings: { joinDate: Date.now() },
			};
			break;
	}
}
function toCurrent(to: Version, data: MigratableData) {
	switch (to) {
		case two:
			function deserializeCategory(
				c: MigratableCategory,
				parent?: string
			): string {
				const id = nanoid();
				localStorage.setItem(
					`data-category-${id}`,
					JSON.stringify({
						...c,
						parent,
						items: c.items.map((i) => {
							const iid = nanoid();
							localStorage.setItem(
								`data-item-${iid}`,
								JSON.stringify({
									...i,
									parent: id,
								})
							);
							return iid;
						}),
						categories: c.categories.map((ca) => deserializeCategory(ca, id)),
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
						return id;
					}),
					categories: data.main.categories.map((ca) => deserializeCategory(ca)),
				})
			);
			localStorage.setItem(
				'settings-join-date',
				JSON.stringify(data.settings.joinDate)
			);
			break;
	}
}
export function exportData(): string {
	return btoa(JSON.stringify(getCurrent(current)));
}
export function importData(data: string) {
	toCurrent(current, JSON.parse(atob(data)));
}
