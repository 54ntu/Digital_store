import { Table, Column, Model, DataType } from "sequelize-typescript"

@Table({
    tableName: "products",
    modelName: "Product",
    timestamps: true,
})


export class Product extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    declare id: string

    @Column({
        type: DataType.STRING,
        allowNull: false,

    })
    declare productName: string

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    declare description: string

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    declare price: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare productStock: number


    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare productImageUrl: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,

    })
    declare discount: number

}