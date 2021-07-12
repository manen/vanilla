import { category, List } from './stores';
import type { Category, CategoryStore } from './stores';
import type { Color } from './color';

export function flatItems({ items, categories }: List): string[] {
	let total: string[] = [];
	items.forEach((i) => total.push(i));
	categories.forEach((id) => {
		category(id).subscribe((c) => total.push(...flatItems(c)))();
	});
	return total;
}

export function findColor(cs: CategoryStore): Color {
	let color: Color = undefined;
	cs.subscribe((c) => {
		if (c.color) color = c.color;
		else if (!c.parent) return;
		else color = findColor(category(c.parent));
	})();

	return color;
}
