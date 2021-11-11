import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class HostGuard implements CanActivate {
  constructor(
    private configService: ConfigService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const key = this.configService.get<string>('KEY');
    let whitelist = [];
    const whitelistString = this.configService.get<string>('WHITELIST');
    const ip: string = request.socket.remoteAddress || null;
    if (whitelistString?.length) {
      whitelist = whitelistString.split(',');
    }
    return request.headers.key && request.headers.key === key && ip && whitelist.includes(ip);
  }
}