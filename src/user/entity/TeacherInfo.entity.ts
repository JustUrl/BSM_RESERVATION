import { BsmOauthUserRole } from 'bsm-oauth';
import { ResponseMember } from 'src/moving-certification/entity/ResponseMember.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  ChildEntity,
} from 'typeorm';
import { HomeRoom } from './HomeRoom.entity';
import { InChargeInfo } from './InChargeInfo.entity';
import { SelfStudyTime } from './SelfStudyTime.entity';
import { User } from './User.entity';

@ChildEntity(BsmOauthUserRole.TEACHER)
export class TeacherInfo extends User {
  @PrimaryColumn()
  userCode: number;

  @OneToMany((type) => InChargeInfo, (inChargeInfo) => inChargeInfo.teacher, {
    cascade: true,
    eager: true,
  })
  inCharged: InChargeInfo[];
}
