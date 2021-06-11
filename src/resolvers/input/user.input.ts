import { Field, InputType } from 'type-graphql';

@InputType()
class UserInput {
  @Field()
  readonly email: string;
}

export default UserInput;
