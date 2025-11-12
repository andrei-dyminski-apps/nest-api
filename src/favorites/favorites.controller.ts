import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new favorite' })
  @ApiResponse({ status: 201, description: 'Favorite created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter by user UUID',
    type: 'string',
    example: '63a7c6d8-adf6-4fdd-8455-24f6722a020d',
  })
  @ApiQuery({
    name: 'offerId',
    required: false,
    description: 'Filter by offer UUID',
    type: 'string',
    example: 'afcc8589-acd1-4de4-b87a-d626f73d207d',
  })
  @ApiResponse({ status: 200, description: 'Returns all favorites' })
  findAll(
    @Query('userId') userId?: string,
    @Query('offerId') offerId?: string,
  ) {
    return this.favoritesService.findAll({ userId, offerId });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a favorite' })
  @ApiParam({ name: 'id', description: 'Favorite UUID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Favorite deleted successfully' })
  @ApiResponse({ status: 404, description: 'Favorite not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.remove(id);
  }
}
