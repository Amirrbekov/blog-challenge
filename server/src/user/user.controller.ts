import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenGuard } from 'src/auth/common/guards';

@UseGuards(AccessTokenGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();
    return { users };
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    return { user };
  }
}
