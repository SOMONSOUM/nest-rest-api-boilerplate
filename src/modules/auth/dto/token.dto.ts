export class TokenDto {
  userId: string;
}

export class ValidateRefreshTokenDto {
  userId: string;
  refreshToken: string;
}

export class ValidateRefreshTokenResponseDto {
  userId: string;
}
