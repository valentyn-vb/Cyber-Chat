import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResponseUserDto } from 'src/users/dto/response-user-dto';
import { LoginResponseDto } from '../dto/login-response-dto';

export function ApiLoginDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Log in with username and password' }),
    ApiOkResponse({
      description: 'JWT access token returned.',
      type: LoginResponseDto,
    }),
    ApiBadRequestResponse({ description: 'Request body validation failed.' }),
    ApiNotFoundResponse({ description: 'User was not found.' }),
    ApiUnauthorizedResponse({ description: 'Password is invalid.' }),
  );
}

export function ApiRegisterDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Register a new user account' }),
    ApiCreatedResponse({
      description: 'User account created.',
      type: ResponseUserDto,
    }),
    ApiBadRequestResponse({ description: 'Request body validation failed.' }),
    ApiConflictResponse({ description: 'Username is already taken.' }),
  );
}
