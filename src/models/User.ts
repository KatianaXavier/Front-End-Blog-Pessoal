import { Postagem } from "./Postagem";

export interface User {
    id: number;
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    postagem?: Postagem[]
}