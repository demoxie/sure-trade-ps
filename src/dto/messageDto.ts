import { ApiProperty } from '@nestjs/swagger';
import { MessageTarget } from '../types';

export class MessageDto {
  @ApiProperty()
  to: string;
  @ApiProperty()
  from: string;
  @ApiProperty()
  subject: string;
  @ApiProperty()
  body: object;
  @ApiProperty()
  sendingService: string;
  @ApiProperty()
  messageTarget: MessageTarget[];
}
