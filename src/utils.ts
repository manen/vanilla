import { category, List } from './stores';

export function flatItems({ items, categories }: List): string[] {
	let total: string[] = [];
	items.forEach((i) => total.push(i));
	categories.forEach((id) => {
		category(id).subscribe((c) => total.push(...flatItems(c)))();
	});
	return total;
}
