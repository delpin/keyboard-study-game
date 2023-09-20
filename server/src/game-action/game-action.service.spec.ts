import { Test, TestingModule } from '@nestjs/testing';
import { GameActionService } from './game-action.service';

describe('GameActionService', () => {
  let service: GameActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameActionService],
    }).compile();

    service = module.get<GameActionService>(GameActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
