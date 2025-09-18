// FILE: shahpoker/apps/api/src/tables/tables.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  // این endpoint باید نتیجه فراخوانی tablesService.create را برگرداند
  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.create(createTableDto);
  }

  // این endpoint لیست تمام میزها را برمی‌گرداند
  @Get()
  findAll() {
    return this.tablesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const table = await this.tablesService.findOne(id);
    if (!table) {
      throw new NotFoundException('Table with this ID not found');
    }
    return table;
  }
}
