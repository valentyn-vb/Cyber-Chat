import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CommentResponseDto } from 'src/comments/dto/comment-response-dto';
import { ThreadListResponseDto } from '../dto/thread-list-response-dto';
import { ThreadResponseDto } from '../dto/thread-response-dto';

export function ApiGetThreadsDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'List threads with pagination' }),
    ApiQuery({ name: 'page', required: false, example: 1 }),
    ApiQuery({
      name: 'limit',
      required: false,
      enum: [1, 2, 3, 10, 20, 30, 50, 100],
      example: 10,
    }),
    ApiOkResponse({ type: ThreadListResponseDto }),
    ApiBadRequestResponse({ description: 'Pagination query is invalid.' }),
  );
}

export function ApiGetThreadDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Get one thread by id' }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiOkResponse({ type: ThreadResponseDto }),
    ApiBadRequestResponse({ description: 'Thread id must be a UUID.' }),
    ApiNotFoundResponse({ description: 'Thread was not found.' }),
  );
}

export function ApiCreateThreadDocs() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Create a thread' }),
    ApiCreatedResponse({ type: ThreadResponseDto }),
    ApiBadRequestResponse({ description: 'Request body validation failed.' }),
    ApiUnauthorizedResponse({
      description: 'Bearer token is missing or invalid.',
    }),
  );
}

export function ApiUpdateThreadDocs() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update a thread' }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiOkResponse({ type: ThreadResponseDto }),
    ApiBadRequestResponse({
      description: 'Thread id or request body validation failed.',
    }),
    ApiNotFoundResponse({ description: 'Thread was not found.' }),
    ApiUnauthorizedResponse({
      description: 'Bearer token is missing or invalid.',
    }),
  );
}

export function ApiCreateThreadCommentDocs() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Create a comment on a thread' }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiCreatedResponse({ type: CommentResponseDto }),
    ApiBadRequestResponse({
      description: 'Thread id or request body validation failed.',
    }),
    ApiUnauthorizedResponse({
      description: 'Bearer token is missing or invalid.',
    }),
  );
}

export function ApiDeleteThreadDocs() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Delete a thread' }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiNoContentResponse({
      description: 'Thread deleted.',
    }),
    ApiBadRequestResponse({ description: 'Thread id must be a UUID.' }),
    ApiNotFoundResponse({ description: 'Thread was not found.' }),
    ApiUnauthorizedResponse({
      description: 'Bearer token is missing or invalid.',
    }),
  );
}
