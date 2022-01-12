import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Livro } from "./livro.model";

@Injectable()
export class LivrosService {
    constructor(
        @InjectModel(Livro)
        private livrosModel: typeof Livro
    ) {

    }
    async obterTodos(): Promise<Livro[]> {
        return this.livrosModel.findAll();
    }

    async obterUm(id: number): Promise<Livro> {
        // chave primária 
        return this.livrosModel.findByPk(id);
    }

    async criar(livro: Livro) {
        this.livrosModel.create(livro);
    }

    async alterar(livro: Livro): Promise<[number, Livro[]]> {
        return this.livrosModel.update(livro, {
            where: {
                id: livro.id
            }
        });
    }

    async apagar(id: number) {
        const livro = await this.obterUm(id);
        livro.destroy();
    }
}