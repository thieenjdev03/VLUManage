export type User = {
    _id: string;
    microsoftId: string;
    displayName: string;
    email: string;
    accessToken:string;
    lastLogin: string;
    role: string;
    status: boolean;
    phone: string;
    personalEmail: string;
    __v:boolean
    }

export type Role = {
    _id: string;
    tenrole: string;
    }