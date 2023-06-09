import { RequestHandler, Router } from 'express';
import {
  archiveChatSchema,
  contactValidateSchema,
  deleteMessageSchema,
  messageUpSchema,
  messageValidateSchema,
  profileNameSchema,
  profilePictureSchema,
  profileStatusSchema,
  readMessageSchema,
  whatsappNumberSchema,
} from '../../validate/validate.schema';
import {
  ArchiveChatDto,
  DeleteMessage,
  NumberDto,
  ProfileNameDto,
  ProfilePictureDto,
  ProfileStatusDto,
  ReadMessageDto,
  WhatsAppNumberDto,
} from '../dto/chat.dto';
import { ContactQuery } from '../repository/contact.repository';
import { MessageQuery } from '../repository/message.repository';
import { chatController } from '../whatsapp.module';
import { RouterBroker } from '../abstract/abstract.router';
import { HttpStatus } from './index.router';
import { MessageUpQuery } from '../repository/messageUp.repository';
import { proto } from '@evolution/base';
import { InstanceDto } from '../dto/instance.dto';

export class ChatRouter extends RouterBroker {
  constructor(...guards: RequestHandler[]) {
    super();
    this.router
      .post(this.routerPath('whatsappNumbers'), ...guards, async (req, res) => {
        const response = await this.dataValidate<WhatsAppNumberDto>({
          request: req,
          schema: whatsappNumberSchema,
          ClassRef: WhatsAppNumberDto,
          execute: (instance, data) => chatController.whatsappNumber(instance, data),
        });

        return res.status(HttpStatus.CREATED).json(response);
      })
      .put(this.routerPath('markMessageAsRead'), ...guards, async (req, res) => {
        const response = await this.dataValidate<ReadMessageDto>({
          request: req,
          schema: readMessageSchema,
          ClassRef: ReadMessageDto,
          execute: (instance, data) => chatController.readMessage(instance, data),
        });

        return res.status(HttpStatus.CREATED).json(response);
      })
      .put(this.routerPath('archiveChat'), ...guards, async (req, res) => {
        const response = await this.dataValidate<ArchiveChatDto>({
          request: req,
          schema: archiveChatSchema,
          ClassRef: ArchiveChatDto,
          execute: (instance, data) => chatController.archiveChat(instance, data),
        });

        return res.status(HttpStatus.CREATED).json(response);
      })
      .delete(
        this.routerPath('deleteMessageForEveryone'),
        ...guards,
        async (req, res) => {
          const response = await this.dataValidate<DeleteMessage>({
            request: req,
            schema: deleteMessageSchema,
            ClassRef: DeleteMessage,
            execute: (instance, data) => chatController.deleteMessage(instance, data),
          });

          return res.status(HttpStatus.CREATED).json(response);
        },
      )
      .post(this.routerPath('fetchProfilePictureUrl'), ...guards, async (req, res) => {
        const response = await this.dataValidate<NumberDto>({
          request: req,
          schema: profilePictureSchema,
          ClassRef: NumberDto,
          execute: (instance, data) => chatController.fetchProfilePicture(instance, data),
        });

        return res.status(HttpStatus.OK).json(response);
      })
      .post(this.routerPath('findContacts'), ...guards, async (req, res) => {
        const response = await this.dataValidate<ContactQuery>({
          request: req,
          schema: contactValidateSchema,
          ClassRef: ContactQuery,
          execute: (instance, data) => chatController.fetchContacts(instance, data),
        });

        return res.status(HttpStatus.OK).json(response);
      })
      .post(this.routerPath('getBase64FromMediaMessage'), ...guards, async (req, res) => {
        const response = await this.dataValidate<proto.IWebMessageInfo>({
          request: req,
          schema: null,
          ClassRef: Object,
          execute: (instance, data) =>
            chatController.getBase64FromMediaMessage(instance, data),
        });

        return res.status(HttpStatus.CREATED).json(response);
      })
      .post(this.routerPath('findMessages'), ...guards, async (req, res) => {
        const response = await this.dataValidate<MessageQuery>({
          request: req,
          schema: messageValidateSchema,
          ClassRef: MessageQuery,
          execute: (instance, data) => chatController.fetchMessages(instance, data),
        });

        return res.status(HttpStatus.OK).json(response);
      })
      .post(this.routerPath('findStatusMessage'), ...guards, async (req, res) => {
        const response = await this.dataValidate<MessageUpQuery>({
          request: req,
          schema: messageUpSchema,
          ClassRef: MessageUpQuery,
          execute: (instance, data) => chatController.fetchStatusMessage(instance, data),
        });

        return res.status(HttpStatus.OK).json(response);
      })
      .get(this.routerPath('findChats'), ...guards, async (req, res) => {
        const response = await this.dataValidate<InstanceDto>({
          request: req,
          schema: null,
          ClassRef: InstanceDto,
          execute: (instance) => chatController.fetchChats(instance),
        });

        return res.status(HttpStatus.OK).json(response);
      })
      // Profile routes
      .post(this.routerPath('getBusinessProfile'), ...guards, async (req, res) => {
        const response = await this.dataValidate<ProfilePictureDto>({
          request: req,
          schema: profilePictureSchema,
          ClassRef: ProfilePictureDto,
          execute: (instance, data) => chatController.getBusinessProfile(instance, data),
        });

        return res.status(HttpStatus.OK).json(response);
      })
      .post(this.routerPath('updateProfileName'), ...guards, async (req, res) => {
        const response = await this.dataValidate<ProfileNameDto>({
          request: req,
          schema: profileNameSchema,
          ClassRef: ProfileNameDto,
          execute: (instance, data) => chatController.updateProfileName(instance, data),
        });

        return res.status(HttpStatus.OK).json(response);
      })
      .post(this.routerPath('updateProfileStatus'), ...guards, async (req, res) => {
        const response = await this.dataValidate<ProfileStatusDto>({
          request: req,
          schema: profileStatusSchema,
          ClassRef: ProfileStatusDto,
          execute: (instance, data) => chatController.updateProfileStatus(instance, data),
        });

        return res.status(HttpStatus.OK).json(response);
      })
      .put(this.routerPath('updateProfilePicture'), ...guards, async (req, res) => {
        const response = await this.dataValidate<ProfilePictureDto>({
          request: req,
          schema: profilePictureSchema,
          ClassRef: ProfilePictureDto,
          execute: (instance, data) =>
            chatController.updateProfilePicture(instance, data),
        });

        return res.status(HttpStatus.OK).json(response);
      })
      .delete(this.routerPath('removeProfilePicture'), ...guards, async (req, res) => {
        const response = await this.dataValidate<ProfilePictureDto>({
          request: req,
          schema: profilePictureSchema,
          ClassRef: ProfilePictureDto,
          execute: (instance, data) =>
            chatController.removeProfilePicture(instance, data),
        });

        return res.status(HttpStatus.OK).json(response);
      });
  }

  public readonly router = Router();
}
