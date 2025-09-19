import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis();
  }

  async set(key: string, value: string, expireSeconds?: number): Promise<void> {
    try {
      if (expireSeconds) {
        await this.redis.set(key, value, 'EX', expireSeconds);
      } else {
        await this.redis.set(key, value);
      }
    } catch (error) {
      throw new Error(`Failed to set key in Redis: ${error.message}`);
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.redis.get(key);
    } catch (error) {
      throw new Error(`Failed to get key from Redis: ${error.message}`);
    }
  }

  async del(key: string): Promise<number> {
    try {
      return await this.redis.del(key);
    } catch (error) {
      throw new Error(`Failed to delete key from Redis: ${error.message}`);
    }
  }

  async exists(key: string): Promise<number> {
    try {
      return await this.redis.exists(key);
    } catch (error) {
      throw new Error(
        `Failed to check key existence in Redis: ${error.message}`,
      );
    }
  }
}
