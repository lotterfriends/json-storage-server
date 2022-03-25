import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HostGuard } from './host.guard';

@Controller()
@UseGuards(HostGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  sendJson(
    @Body() json: unknown,
    @Query('filename') filename: string,
  ): { filename: string } {
    try {
      JSON.parse(JSON.stringify(json));
    } catch (e) {
      console.log(e);
      throw new BadRequestException('invalid json');
    }

    return this.appService.upload(json, filename);
  }

  @Get()
  getJson(@Query('filename') filename: string): unknown {
    return this.appService.getFile(filename);
  }
}
