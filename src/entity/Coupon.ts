import { IsEnum, IsNumber, IsString } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
export enum CouponType {
  Percent = 'percent',
  Fixed = 'fixed',
  Mixed = 'mixed',
  Rejected = 'rejected',
}
@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  value: number;
  @Column()
  @IsEnum(CouponType)
  type: CouponType;

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}
