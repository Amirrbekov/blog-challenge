import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dtos/createBlog.dto';
import { UpdateBlogDto } from './dtos/updateBlog.dto';
import { CreateCommentDto } from './dtos/createComment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepo: Repository<Blog>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  async getAllBlogs() {
    return this.blogRepo.find({
      relations: ['comments', 'author'],
      order: { createdAt: 'DESC' },
    });
  }

  async getblogById(id: number) {
    const blog = await this.blogRepo.findOne({
      where: { id },
      relations: ['comments', 'author'],
    });
    if (!blog) throw new NotFoundException('blog not found');
    return blog;
  }

  async createblog(dto: CreateBlogDto, userId: number) {
    const blog = this.blogRepo.create({ ...dto, authorId: userId });
    return this.blogRepo.save(blog);
  }

  async updateblog(id: number, dto: UpdateBlogDto, userId: number) {
    const blog = await this.getblogById(id);
    if (blog.authorId !== userId) {
      throw new ForbiddenException('You cannot edit this post');
    }
    Object.assign(blog, dto);
    return this.blogRepo.save(blog);
  }

  async deleteblog(id: number, userId: number) {
    const blog = await this.getblogById(id);
    if (blog.authorId !== userId) {
      throw new ForbiddenException('You cannot delete this post');
    }
    return this.blogRepo.remove(blog);
  }

  async addComment(blogId: number, dto: CreateCommentDto, userId: number) {
    const blog = await this.getblogById(blogId);
    const comment = this.commentRepo.create({
      ...dto,
      blog,
      authorId: userId,
    });
    return this.commentRepo.save(comment);
  }
}
