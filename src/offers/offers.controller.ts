import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@ApiTags('offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new offer' })
  @ApiResponse({ status: 201, description: 'Offer created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all offers' })
  @ApiResponse({ status: 200, description: 'Returns all offers' })
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an offer by ID' })
  @ApiParam({ name: 'id', description: 'Offer UUID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Returns the offer' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an offer' })
  @ApiParam({ name: 'id', description: 'Offer UUID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Offer updated successfully' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.update(id, updateOfferDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an offer' })
  @ApiParam({ name: 'id', description: 'Offer UUID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Offer deleted successfully' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  remove(@Param('id') id: string) {
    return this.offersService.remove(id);
  }
}
