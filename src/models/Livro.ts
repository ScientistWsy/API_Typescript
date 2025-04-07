import Editora from "./Editora";

export default interface Livro {
    Id: number,
    Titulo: string,
    Autor: string,
    ISBN: number,
    AnoDePublicacao: number,
    Editora: Editora
}