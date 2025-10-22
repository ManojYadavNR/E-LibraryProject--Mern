import type{ user } from "../users/userTypes.ts";

export interface Book {
    _id:string;
    title:string;
    author:user;
    genre:string;
    cover:string;
    file:string;
    createdat:Date;
    updatedat:Date;
}