import { Test, TestingModule } from '@nestjs/testing';
import * as httpMock from 'node-mocks-http';
import { UserController } from './user.controller';
import { UserService } from './user/user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  // it('Should can say "Halo Coba Mustache"', async () => {
  //   const res = controller.helloBa('Coba', 'Mustache');
  //   expect(res).toBe('Halo Coba Mustache');
  // });

  it('should can say hello', async () => {
    const res = httpMock.createResponse();
    controller.getHello('Bambang', res);

    expect(res._getData()).toBe('Hello Bambang!');
  });

  it('Should can get View', async () => {
    const res = httpMock.createResponse();
    controller.viewHello('Andry', res);

    expect(res._getRenderView()).toBe('index.html');
    expect(res._getRenderData()).toEqual({
      name: 'Andry',
      title: 'Coba Mustache',
    });
  });
});
