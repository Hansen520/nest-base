/**
 * 用户实体类
 *
 * 该实体类映射数据库中的 users 表，用于存储系统用户信息。
 * 包含用户的登录凭证、个人资料、角色关联等核心字段。
 */
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./role.entity";

/**
 * 用户实体
 *
 * @description映射 users 表，存储系统用户信息
 * @example
 * ```typescript
 * const user = new User();
 * user.username = 'admin';
 * user.nickName = '管理员';
 * user.email = 'admin@example.com';
 * ```
 */
@Entity({
    name: 'users'
})
export class User {

    /**
     * 用户ID
     *
     * @description 主键，自增生成，用于唯一标识每个用户
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * 用户名
     *
     * @description 用户登录账号名称，最大长度50个字符
     */
    @Column({
        length: 50,
        comment: '用户名'
    })
    username: string;

    /**
     * 密码
     *
     * @description 用户登录密码（加密存储），最大长度50个字符
     */
    @Column({
        length: 50,
        comment: '密码'
    })
    password: string;

    /**
     * 昵称
     *
     * @description 用户的显示名称，最大长度50个字符
     */
    @Column({
        name: 'nick_name',
        length: 50,
        comment: '昵称'
    })
    nickName: string;


    /**
     * 邮箱
     *
     * @description 用户的电子邮箱地址，用于找回密码和接收通知，最大长度50个字符
     */
    @Column({
        comment: '邮箱',
        length: 50
    })
    email: string;


    /**
     * 头像
     *
     * @description 用户头像的URL地址，可为空（使用默认头像）
     */
    @Column({
        comment: '头像',
        length: 100,
        nullable: true
    })
    headPic: string;

    /**
     * 手机号
     *
     * @description 用户的手机号码，可为空
     */
    @Column({
        comment: '手机号',
        length: 20,
        nullable: true
    })
    phoneNumber: string;

    /**
     * 是否冻结
     *
     * @description 标记用户是否被冻结，被冻结的用户将无法登录系统，默认为 false（未冻结）
     */
    @Column({
        comment: '是否冻结',
        default: false
    })
    isFrozen: boolean;

    /**
     * 是否为管理员
     *
     * @description 标记用户是否为系统管理员，管理员拥有更高的权限，默认为 false
     */
    @Column({
        comment: '是否是管理员',
        default: false
    })
    isAdmin: boolean;

    /**
     * 创建时间
     *
     * @description 用户账号的创建时间，由数据库自动维护
     */
    @CreateDateColumn()
    createTime: Date;

    /**
     * 更新时间
     *
     * @description 用户信息的最后更新时间，由数据库自动维护
     */
    @UpdateDateColumn()
    updateTime: Date;

    /**
     * 用户角色
     *
     * @description 用户关联的角色列表，支持多对多关系，通过 user_roles 中间表关联
     */
    @ManyToMany(() => Role) // 这个区关联Role
    @JoinTable({
        name: 'user_roles' // 这里会新建一个一个角色的表
    })
    roles: Role[]
}