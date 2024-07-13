import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDtoParameters } from "./interface";

export class PageMetaDto {
  @ApiProperty({ type: Number, example: 1 })
  readonly page: number;

  @ApiProperty({ type: Number, example: 1 })
  readonly take: number;

  @ApiProperty({ type: Number, example: 1 })
  readonly itemCount: number;

  @ApiProperty({ type: Number, example: 1 })
  readonly pageCount: number;

  @ApiProperty({ type: Boolean, example: false })
  readonly hasPreviousPage: boolean;

  @ApiProperty({ type: Boolean, example: false })
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}