export interface User {
    username: string;
}

export type UserForm = Pick<User, 'username'>;