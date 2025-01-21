/*
 * @Date: 2024-08-16 10:10:46
 * @Description: description
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Aaa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
  })
  aaa: string;

  @Column({
    length: 30,
  })
  bbb: string;
}
