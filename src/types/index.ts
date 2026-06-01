export const role = ['admin', 'user', 'super_admin'] as const;

export type TRole = (typeof role)[number];

export type TUser = {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    age: number;
    role: TRole;
    created_at: Date;
    updated_at: Date;
};

export type OUser = Omit<
    TUser,
    'id' | 'created_at' | 'updated_at' | 'password_hash'
>;

export type TOrder = {
    id: number;
    customer_id: number;
    quantity: number;
    food: string;
    price: number;
    created_at: Date;
    updated_at: Date;
};

export type OOrder = Omit<TOrder, 'id' | 'created_at' | 'updated_at'>;
