import { SetMetadata } from '@nestjs/common';

// Membuat metadata kustom
export const Role = (...roles: string[]) => SetMetadata('roles', roles);
