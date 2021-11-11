import { BadRequestException, Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { HostGuard } from './host.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }


  @Post()
  @UseGuards(HostGuard)
  sendJson(@Body() json: {}, @Query('filename') filename: string): { filename: string } {

    try {
      JSON.parse(JSON.stringify(json));
    } catch (e) {
      console.log(e);
      throw new BadRequestException('invalid json');
    }

    return this.appService.upload(json, filename);
  }
}
