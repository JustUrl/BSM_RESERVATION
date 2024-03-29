import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BsmOauthUserRole } from 'bsm-oauth';
import { Roles } from 'src/auth/decorator/roles.decorator';
import JwtAuthGuard from 'src/auth/guards/auth.guard';
import { levelGuard } from 'src/auth/guards/level.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RequestReservationDto } from './dto/requestReservation.dto';
import { ResponseReservationDto } from 'src/moving-certification/dto/responseReservation.dto';
import { TeacherInfo } from 'src/user/entity/TeacherInfo.entity';
import { MovingCertificationService } from './moving-certification.service';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { User } from 'src/user/entity/User.entity';

@Controller('moving-certification')
@UseGuards(JwtAuthGuard, levelGuard, RolesGuard)
export class MovingCertificationController {
  constructor(private certificationService: MovingCertificationService) {}

  /// 예약을 요청하는 API ///
  @Post('/request')
  @Roles(BsmOauthUserRole.STUDENT)
  async requestToTeacher(@Body() requestReservationDto: RequestReservationDto) {
    // 학생이 이석 요청을 한다, 이 API를 사용한다.
    return await this.certificationService.requestRoom(requestReservationDto);
  }

  /// 예약을 승인 및 거부하는 API ///
  @Post('/response')
  @Roles(BsmOauthUserRole.TEACHER) //잠깐 학생 역할인 내가 테스트하기위해..
  async responseToStudents(
    @GetUser() user: TeacherInfo,
    @Body() responseReservationDto: ResponseReservationDto,
  ) {
    return await this.certificationService.responseRoom(
      user,
      responseReservationDto,
    );
  }

  //학생과 선생님에 따라서 요청받았거나, 요청한 정보들을 보내준다.
  @Get('/myWatingRequests')
  @Roles(BsmOauthUserRole.STUDENT, BsmOauthUserRole.TEACHER)
  async getMyRequests(@GetUser() user: User) {
    const userInfo: User = user;
    return await this.certificationService.getMyWatingRequests(<User>userInfo);
  }

  //페이지에 따라서 요청한 정보들을 보내준다.
  @Get('/myRequests/:page')
  @Roles(BsmOauthUserRole.STUDENT, BsmOauthUserRole.TEACHER)
  async getMyPagenationRequests(
    @GetUser() user: User,
    @Query('page') page: number,
  ) {
    return await this.certificationService.getMyPagenationRequest(user, page);
  }

  @Get('/getStudentRequests/:userCode/:page')
  @Roles(BsmOauthUserRole.TEACHER)
  async getOtherUserPagenationRequest(
    @Query('userCode') userCode: number,
    @Query('page') page: number,
  ) {
    //다른사람의 요청정보 리스트를 리턴한다
    return await this.certificationService.getStudentRequests(userCode, page);
  }
}
