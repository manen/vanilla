import { writable } from 'svelte/store';
import type { Readable, Updater } from 'svelte/store';

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

interface Main {
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
export interface MainStore extends Readable<Main> {}
export interface CategoryStore extends Readable<Category> {}
export interface ItemStore extends Readable<Item> {}

const mainID = () => 'data-main';
const categoryID = (id: string) => `data-category-${id}`;
const itemID = (id: string) => `data-item-${id}`;

const main: MainStore = createMain();
const categoryCache: Record<string, CategoryStore> = {};
const itemCache: Record<string, ItemStore> = {};

function createMain(): MainStore {
	const raw = writable<Main>(
		localStorage.getItem(mainID())
			? JSON.parse(localStorage.getItem(mainID()) || '{}')
			: { items: [] }
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

	return {
		subscribe: raw.subscribe,
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

	return {
		subscribe: raw.subscribe,
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
