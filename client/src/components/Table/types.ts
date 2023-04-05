export interface Item {
    key: string;
    licensePlate: string;
    ownerName: string;
    horsePower: number;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}