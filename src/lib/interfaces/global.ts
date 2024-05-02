export interface Matrix {
	[key: string]: { [key: string]: Ship | {} };
}
export interface Ship {
	id: number;
	name: string;
	size: number;
	pos: number[][];
	horizontal: boolean;
	distroyed: boolean;
	taken: boolean;
}
