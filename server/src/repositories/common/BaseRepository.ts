import mongoose, { Document, model } from "mongoose";

export interface IBaseRepository<T extends Document> {
    create(data: Partial<T>): Promise<T>
    findByEmail(email: string): Promise<T |  null>
}

export class BaseRepository<T extends Document> {
  private model: mongoose.Model<T>;

  constructor(model: mongoose.Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = new this.model(data);
    return await entity.save();
  }

  async findByEmail(email: string): Promise<T | null> {
    return await this.model.findOne({ email });
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async find(filter: any): Promise<T[]> {
    return await this.model.find(filter);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().populate('userId', 'name')
  }

  async updateById(feedbackId: string, update: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(feedbackId, update, {new: true})
  }
}