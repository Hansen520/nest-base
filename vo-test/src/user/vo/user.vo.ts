/*
 * @Date: 2025-02-19 14:26:40
 * @Description: description
 */
export class UserVo {
  id: number;

  username: string;

  email: string;

  constructor(partial: Partial<UserVo>) {
    Object.assign(this, partial);
  }
}
