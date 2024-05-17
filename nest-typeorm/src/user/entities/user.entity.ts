/*
 * @Date: 2024-05-09 11:04:53
 * @Description: description
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'aaa_user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    length: 50,
  })
  name: string;
}
