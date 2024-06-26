/*
 * @Date: 2024-05-14 16:19:12
 * @Description: description
 */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    // @Column()
    // age: number

    @Column()
    email: string

}
