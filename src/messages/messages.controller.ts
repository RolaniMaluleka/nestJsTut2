import { Controller, Get, Post, Body, Param, NotFoundException, BadRequestException} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service'; 

@Controller('messages')
export class MessagesController {
    constructor(public messagesService: MessagesService,){}
       
    @Get()
    listMessages(){
        return this.messagesService.findAll();
    }

    @Post()
    async createMessage(@Body() body: CreateMessageDto){
       const createdMessage = this.messagesService.create(body.content);

       if(!createdMessage){
        throw new BadRequestException("Message is of type string not Numbers")
       }

       return createdMessage
    }

    @Get('/:id')
    async getMessages(@Param('id') id: string){
        
        const message = await this.messagesService.findOne(id);

        if(!message){
            throw new NotFoundException('Message with that id does not exist') ;
        }
        return message
    }

}
