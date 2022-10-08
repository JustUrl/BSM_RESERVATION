import { BaseEntity, Column, Entity, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity('Student_info')
export class StudentInfo extends BaseEntity {
  @PrimaryColumn({
    name: 'user_code',
    type: 'int',
  })
  userCode: number;

  @Column({
    name: 'enrolled_at',
    type: 'int',
    nullable: false,
  })
  enrolledAt: number;

  @Column({
    name: 'grade',
    type: 'int',
    nullable: false,
  })
  grade: number;

  @Column({
    name: 'class_no',
    type: 'int',
    nullable: false,
  })
  classNo: number;

  @Column({
    name: 'student_no',
    type: 'int',
    nullable: false,
  })
  studentNo: number;
}
