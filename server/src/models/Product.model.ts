import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
    tableName: "products",
})
class Product extends Model {
    @Column({
        type: DataType.STRING,
    })
    declare name: string;

    @Column({
        type: DataType.FLOAT,
    })
    declare price: number;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
    })
    declare available: boolean;
}

export default Product;
