import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateCommentDto } from './dtos/createComment.dto';
import { UpdateBlogDto } from './dtos/updateBlog.dto';
import { CreateBlogDto } from './dtos/createBlog.dto';
import { AccessTokenGuard } from 'src/auth/common/guards';

@UseGuards(AccessTokenGuard)
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Get(':id')
  getBlogById(@Param('id') id: number) {
    return this.blogService.getblogById(id);
  }

  @Post()
  createBlog(
    @Body() dto: CreateBlogDto,
    @Req() req: { user: { sub: number } },
  ) {
    return this.blogService.createblog(dto, req.user.sub);
  }

  @Put(':id')
  updateBlog(
    @Param('id') id: number,
    @Body() dto: UpdateBlogDto,
    @Req() req: { user: { sub: number } },
  ) {
    return this.blogService.updateblog(id, dto, req.user.sub);
  }

  @Delete(':id')
  deleteBlog(@Param('id') id: number, @Req() req: { user: { sub: number } }) {
    return this.blogService.deleteblog(id, req.user.sub);
  }

  @Post(':id/comments')
  addComment(
    @Param('id') blogId: number,
    @Body() dto: CreateCommentDto,
    @Req() req: { user: { sub: number } },
  ) {
    return this.blogService.addComment(blogId, dto, req.user.sub);
  }
}
