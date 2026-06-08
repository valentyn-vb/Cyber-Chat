import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CommentResponseDto } from '../dto/comment-response-dto';

export function ApiGetCommentsDocs() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'List comments' }),
    ApiOkResponse({ type: [CommentResponseDto] }),
    ApiUnauthorizedResponse({
      description: 'Bearer token is missing or invalid.',
    }),
  );
}

export function ApiGetCommentDocs() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get one comment by id' }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiOkResponse({ type: CommentResponseDto }),
    ApiBadRequestResponse({ description: 'Comment id must be a UUID.' }),
    ApiNotFoundResponse({ description: 'Comment was not found.' }),
    ApiUnauthorizedResponse({
      description: 'Bearer token is missing or invalid.',
    }),
  );
}
