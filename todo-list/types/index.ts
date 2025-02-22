export type IType = 'Fruit' | 'Vegetable';

export type IItem = {
    type: IType;
    name: string;
};

export type IInitialItemState = {
    allItems: IItem[];
    Vegetable: IItem[];
    Fruit: IItem[];
}