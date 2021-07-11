import { writable } from 'svelte/store';
import type { Readable, Updater } from 'svelte/store';
import { nanoid } from 'nanoid';

// # Design
//
// ## Terminology
//
// Main: An ID-less/static-ID category
// Category: A list of eithers
// Item: An item, with name, amount, unit, etc...
// Either: A category or an item
//
// ## Implementation
//
// Since we want good performance, user experience, and developer experience in
// this very professional re-skinned notes app, we're gonna use svelte's stores,
// connected up to localStorage. (every single store set triggers a localStorage
// setItem)
//
// Categories and main would have two arrays of IDs, one for items, and one for
// subcategories
//
// We'd have a main store, and 2 cached functions for getting category and item
// stores

export interface Main {
	items: string[];
	categories: string[];
}
export interface Category {
	name: string;
	items: string[];
	categories: string[];
}
export interface Item {
	name: string;
	amount: number;
	unit: string;
}
export interface List {
	items: string[];
	categories: string[];
}
export interface MainStore extends Readable<Main> {
	pushItem(...items: Item[]): void;
	pushCategory(...categories: Category[]): void;
}
export interface CategoryStore extends Readable<Category> {
	pushItem(...items: Item[]): void;
	pushCategory(...categories: Category[]): void;
	setName(name: string): void;
	set(category: Category): void;
}
export interface ItemStore extends Readable<Item> {
	setName(name: string): void;
	setAmount(amount: number): void;
	setUnit(unit: string): void;
	set(item: Item): void;
}

const mainID = () => 'data-main';
const categoryID = (id: string) => `data-category-${id}`;
const itemID = (id: string) => `data-item-${id}`;

const main: MainStore = createMain();
const categoryCache: Record<string, CategoryStore> = {};
const itemCache: Record<string, ItemStore> = {};

function createItemID(newItem: Item): string {
	const id = nanoid();
	const s = item(id);
	s.set(newItem);

	return id;
}
function pushItemID(update: (fn: Updater<any>) => void, ...items: string[]) {
	update((list: Main | Category) => {
		list.items.push(...items);
		return list;
	});
}
function createPushItem(
	update: (fn: Updater<any>) => void
): (...items: Item[]) => void {
	return (...items) => {
		pushItemID(update, ...items.map((item) => createItemID(item)));
	};
}

function createCategoryID(newCategory: Category): string {
	const id = nanoid();
	const s = category(id);
	s.set(newCategory);

	return id;
}
function pushCategoryID(
	update: (fn: Updater<any>) => void,
	...categories: string[]
) {
	update((list: Main | Category) => {
		list.categories.push(...categories);
		return list;
	});
}
function createPushCategory(
	update: (fn: Updater<any>) => void
): (...categories: Category[]) => void {
	return (...categories) => {
		pushCategoryID(
			update,
			...categories.map((category) => createCategoryID(category))
		);
	};
}

function createMain(): MainStore {
	const raw = writable<Main>(
		localStorage.getItem(mainID())
			? JSON.parse(localStorage.getItem(mainID()) || '{}')
			: {
					items: [],
					categories: [],
			  }
	);

	function set(value: Main) {
		raw.set(value);
		localStorage.setItem(mainID(), JSON.stringify(value));
	}
	function update(fn: Updater<Main>) {
		raw.update((val) => {
			const newVal = fn(val);
			localStorage.setItem(mainID(), JSON.stringify(newVal));
			return newVal;
		});
	}

	return {
		subscribe: raw.subscribe,
		pushItem: createPushItem(update),
		pushCategory: createPushCategory(update),
	};
}
function createCategory(id: string): CategoryStore {
	const raw = writable<Category>(
		localStorage.getItem(categoryID(id))
			? JSON.parse(localStorage.getItem(categoryID(id)) || '')
			: { name: '', items: [] }
	);

	function set(value: Category) {
		raw.set(value);
		localStorage.setItem(categoryID(id), JSON.stringify(value));
	}
	function update(fn: Updater<Category>) {
		raw.update((val) => {
			const newVal = fn(val);
			localStorage.setItem(categoryID(id), JSON.stringify(newVal));
			return newVal;
		});
	}

	function setName(name: string) {
		update((category) => {
			category.name = name;
			return category;
		});
	}

	return {
		subscribe: raw.subscribe,
		pushItem: createPushItem(update),
		pushCategory: createPushCategory(update),
		setName,
		set,
	};
}
function createItem(id: string): ItemStore {
	const raw = writable<Item>(
		localStorage.getItem(itemID(id))
			? JSON.parse(localStorage.getItem(itemID(id)) || '{}')
			: { name: '', amount: 1, unit: '' }
	);

	function set(value: Item) {
		raw.set(value);
		localStorage.setItem(itemID(id), JSON.stringify(value));
	}
	function update(fn: Updater<Item>) {
		raw.update((val) => {
			const newVal = fn(val);
			localStorage.setItem(itemID(id), JSON.stringify(newVal));
			return newVal;
		});
	}

	function setName(name: string) {
		update((i) => {
			i.name = name;
			return i;
		});
	}
	function setAmount(amount: number) {
		update((i) => {
			i.amount = amount;
			return i;
		});
	}
	function setUnit(unit: string) {
		update((i) => {
			i.unit = unit;
			return i;
		});
	}

	return {
		subscribe: raw.subscribe,
		setName,
		setAmount,
		setUnit,
		set,
	};
}

function category(id: string): CategoryStore {
	if (categoryCache[id]) {
		return categoryCache[id];
	} else {
		const s = createCategory(id);
		categoryCache[id] = s;
		return s;
	}
}
function item(id: string): ItemStore {
	if (itemCache[id]) {
		return itemCache[id];
	} else {
		const s = createItem(id);
		itemCache[id] = s;
		return s;
	}
}

export { main, category, item };
