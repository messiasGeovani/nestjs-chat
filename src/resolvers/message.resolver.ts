import {
  Args,
  Mutation,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import Message from 'src/db/models/message.entity';
import RepoService from 'src/repo.service';
import MessageInput from './input/message.input';

@Resolver()
class MessageResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return this.repoService.messageRepo.find();
  }

  @Query(() => Message, { nullable: true })
  public async getMessagesFromUser(
    @Args('userId') userId: number,
  ): Promise<Message> {
    return this.repoService.messageRepo.findOne({
      where: { userId },
    });
  }

  @Query(() => Message, { nullable: true })
  public async getMessage(@Args('id') id: number): Promise<Message> {
    return this.repoService.messageRepo.findOne(id);
  }

  @Mutation(() => Message)
  public async createMessage(
    @Args('data') input: MessageInput,
  ): Promise<Message> {
    const message = this.repoService.messageRepo.create();
    return this.repoService.messageRepo.save(message);
  }

  // @ResolveProperty()
  // public async author(@Parent() parent): Promise<Author> {
  //   return this.repoService.authorRepo.findOne(parent.authorId);
  // }
}

export default MessageResolver;
