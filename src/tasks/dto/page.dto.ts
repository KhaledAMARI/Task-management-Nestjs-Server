import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PageDto<T> {
  @ApiProperty({ isArray: true })
  @IsArray()
  readonly data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
