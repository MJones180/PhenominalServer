module.exports = {
        typeDefs: /* GraphQL */ `type AggregateCharity {
  count: Int!
}

type AggregateCircle {
  count: Int!
}

type AggregateDot {
  count: Int!
}

type AggregateEvent {
  count: Int!
}

type AggregateHalo {
  count: Int!
}

type AggregateIdentity {
  count: Int!
}

type AggregateLoop {
  count: Int!
}

type AggregatePreferences {
  count: Int!
}

type AggregateSpecialFundraiser {
  count: Int!
}

type AggregateTransaction {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Charity {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  acronym: String
  bannerCredit: String
  ein: String!
  expensesAdministrative: Float
  expensesFundraising: Float
  expensesOther: Float
  expensesProgram: Float
  expensesUpdated: String
  location: String!
  mission: String!
  name: String!
  phoneNumber: String!
  website: String!
  events(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event!]
  followers(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type CharityConnection {
  pageInfo: PageInfo!
  edges: [CharityEdge]!
  aggregate: AggregateCharity!
}

input CharityCreateInput {
  acronym: String
  bannerCredit: String
  ein: String!
  expensesAdministrative: Float
  expensesFundraising: Float
  expensesOther: Float
  expensesProgram: Float
  expensesUpdated: String
  location: String!
  mission: String!
  name: String!
  phoneNumber: String!
  website: String!
  events: EventCreateManyWithoutCharityInput
  followers: UserCreateManyWithoutFollowedCharitiesInput
}

input CharityCreateManyWithoutFollowersInput {
  create: [CharityCreateWithoutFollowersInput!]
  connect: [CharityWhereUniqueInput!]
}

input CharityCreateOneWithoutEventsInput {
  create: CharityCreateWithoutEventsInput
  connect: CharityWhereUniqueInput
}

input CharityCreateWithoutEventsInput {
  acronym: String
  bannerCredit: String
  ein: String!
  expensesAdministrative: Float
  expensesFundraising: Float
  expensesOther: Float
  expensesProgram: Float
  expensesUpdated: String
  location: String!
  mission: String!
  name: String!
  phoneNumber: String!
  website: String!
  followers: UserCreateManyWithoutFollowedCharitiesInput
}

input CharityCreateWithoutFollowersInput {
  acronym: String
  bannerCredit: String
  ein: String!
  expensesAdministrative: Float
  expensesFundraising: Float
  expensesOther: Float
  expensesProgram: Float
  expensesUpdated: String
  location: String!
  mission: String!
  name: String!
  phoneNumber: String!
  website: String!
  events: EventCreateManyWithoutCharityInput
}

type CharityEdge {
  node: Charity!
  cursor: String!
}

enum CharityOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  acronym_ASC
  acronym_DESC
  bannerCredit_ASC
  bannerCredit_DESC
  ein_ASC
  ein_DESC
  expensesAdministrative_ASC
  expensesAdministrative_DESC
  expensesFundraising_ASC
  expensesFundraising_DESC
  expensesOther_ASC
  expensesOther_DESC
  expensesProgram_ASC
  expensesProgram_DESC
  expensesUpdated_ASC
  expensesUpdated_DESC
  location_ASC
  location_DESC
  mission_ASC
  mission_DESC
  name_ASC
  name_DESC
  phoneNumber_ASC
  phoneNumber_DESC
  website_ASC
  website_DESC
}

type CharityPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  acronym: String
  bannerCredit: String
  ein: String!
  expensesAdministrative: Float
  expensesFundraising: Float
  expensesOther: Float
  expensesProgram: Float
  expensesUpdated: String
  location: String!
  mission: String!
  name: String!
  phoneNumber: String!
  website: String!
}

type CharitySubscriptionPayload {
  mutation: MutationType!
  node: Charity
  updatedFields: [String!]
  previousValues: CharityPreviousValues
}

input CharitySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CharityWhereInput
  AND: [CharitySubscriptionWhereInput!]
  OR: [CharitySubscriptionWhereInput!]
  NOT: [CharitySubscriptionWhereInput!]
}

input CharityUpdateInput {
  acronym: String
  bannerCredit: String
  ein: String
  expensesAdministrative: Float
  expensesFundraising: Float
  expensesOther: Float
  expensesProgram: Float
  expensesUpdated: String
  location: String
  mission: String
  name: String
  phoneNumber: String
  website: String
  events: EventUpdateManyWithoutCharityInput
  followers: UserUpdateManyWithoutFollowedCharitiesInput
}

input CharityUpdateManyWithoutFollowersInput {
  create: [CharityCreateWithoutFollowersInput!]
  delete: [CharityWhereUniqueInput!]
  connect: [CharityWhereUniqueInput!]
  disconnect: [CharityWhereUniqueInput!]
  update: [CharityUpdateWithWhereUniqueWithoutFollowersInput!]
  upsert: [CharityUpsertWithWhereUniqueWithoutFollowersInput!]
}

input CharityUpdateOneWithoutEventsInput {
  create: CharityCreateWithoutEventsInput
  update: CharityUpdateWithoutEventsDataInput
  upsert: CharityUpsertWithoutEventsInput
  delete: Boolean
  disconnect: Boolean
  connect: CharityWhereUniqueInput
}

input CharityUpdateWithoutEventsDataInput {
  acronym: String
  bannerCredit: String
  ein: String
  expensesAdministrative: Float
  expensesFundraising: Float
  expensesOther: Float
  expensesProgram: Float
  expensesUpdated: String
  location: String
  mission: String
  name: String
  phoneNumber: String
  website: String
  followers: UserUpdateManyWithoutFollowedCharitiesInput
}

input CharityUpdateWithoutFollowersDataInput {
  acronym: String
  bannerCredit: String
  ein: String
  expensesAdministrative: Float
  expensesFundraising: Float
  expensesOther: Float
  expensesProgram: Float
  expensesUpdated: String
  location: String
  mission: String
  name: String
  phoneNumber: String
  website: String
  events: EventUpdateManyWithoutCharityInput
}

input CharityUpdateWithWhereUniqueWithoutFollowersInput {
  where: CharityWhereUniqueInput!
  data: CharityUpdateWithoutFollowersDataInput!
}

input CharityUpsertWithoutEventsInput {
  update: CharityUpdateWithoutEventsDataInput!
  create: CharityCreateWithoutEventsInput!
}

input CharityUpsertWithWhereUniqueWithoutFollowersInput {
  where: CharityWhereUniqueInput!
  update: CharityUpdateWithoutFollowersDataInput!
  create: CharityCreateWithoutFollowersInput!
}

input CharityWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  acronym: String
  acronym_not: String
  acronym_in: [String!]
  acronym_not_in: [String!]
  acronym_lt: String
  acronym_lte: String
  acronym_gt: String
  acronym_gte: String
  acronym_contains: String
  acronym_not_contains: String
  acronym_starts_with: String
  acronym_not_starts_with: String
  acronym_ends_with: String
  acronym_not_ends_with: String
  bannerCredit: String
  bannerCredit_not: String
  bannerCredit_in: [String!]
  bannerCredit_not_in: [String!]
  bannerCredit_lt: String
  bannerCredit_lte: String
  bannerCredit_gt: String
  bannerCredit_gte: String
  bannerCredit_contains: String
  bannerCredit_not_contains: String
  bannerCredit_starts_with: String
  bannerCredit_not_starts_with: String
  bannerCredit_ends_with: String
  bannerCredit_not_ends_with: String
  ein: String
  ein_not: String
  ein_in: [String!]
  ein_not_in: [String!]
  ein_lt: String
  ein_lte: String
  ein_gt: String
  ein_gte: String
  ein_contains: String
  ein_not_contains: String
  ein_starts_with: String
  ein_not_starts_with: String
  ein_ends_with: String
  ein_not_ends_with: String
  expensesAdministrative: Float
  expensesAdministrative_not: Float
  expensesAdministrative_in: [Float!]
  expensesAdministrative_not_in: [Float!]
  expensesAdministrative_lt: Float
  expensesAdministrative_lte: Float
  expensesAdministrative_gt: Float
  expensesAdministrative_gte: Float
  expensesFundraising: Float
  expensesFundraising_not: Float
  expensesFundraising_in: [Float!]
  expensesFundraising_not_in: [Float!]
  expensesFundraising_lt: Float
  expensesFundraising_lte: Float
  expensesFundraising_gt: Float
  expensesFundraising_gte: Float
  expensesOther: Float
  expensesOther_not: Float
  expensesOther_in: [Float!]
  expensesOther_not_in: [Float!]
  expensesOther_lt: Float
  expensesOther_lte: Float
  expensesOther_gt: Float
  expensesOther_gte: Float
  expensesProgram: Float
  expensesProgram_not: Float
  expensesProgram_in: [Float!]
  expensesProgram_not_in: [Float!]
  expensesProgram_lt: Float
  expensesProgram_lte: Float
  expensesProgram_gt: Float
  expensesProgram_gte: Float
  expensesUpdated: String
  expensesUpdated_not: String
  expensesUpdated_in: [String!]
  expensesUpdated_not_in: [String!]
  expensesUpdated_lt: String
  expensesUpdated_lte: String
  expensesUpdated_gt: String
  expensesUpdated_gte: String
  expensesUpdated_contains: String
  expensesUpdated_not_contains: String
  expensesUpdated_starts_with: String
  expensesUpdated_not_starts_with: String
  expensesUpdated_ends_with: String
  expensesUpdated_not_ends_with: String
  location: String
  location_not: String
  location_in: [String!]
  location_not_in: [String!]
  location_lt: String
  location_lte: String
  location_gt: String
  location_gte: String
  location_contains: String
  location_not_contains: String
  location_starts_with: String
  location_not_starts_with: String
  location_ends_with: String
  location_not_ends_with: String
  mission: String
  mission_not: String
  mission_in: [String!]
  mission_not_in: [String!]
  mission_lt: String
  mission_lte: String
  mission_gt: String
  mission_gte: String
  mission_contains: String
  mission_not_contains: String
  mission_starts_with: String
  mission_not_starts_with: String
  mission_ends_with: String
  mission_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  phoneNumber: String
  phoneNumber_not: String
  phoneNumber_in: [String!]
  phoneNumber_not_in: [String!]
  phoneNumber_lt: String
  phoneNumber_lte: String
  phoneNumber_gt: String
  phoneNumber_gte: String
  phoneNumber_contains: String
  phoneNumber_not_contains: String
  phoneNumber_starts_with: String
  phoneNumber_not_starts_with: String
  phoneNumber_ends_with: String
  phoneNumber_not_ends_with: String
  website: String
  website_not: String
  website_in: [String!]
  website_not_in: [String!]
  website_lt: String
  website_lte: String
  website_gt: String
  website_gte: String
  website_contains: String
  website_not_contains: String
  website_starts_with: String
  website_not_starts_with: String
  website_ends_with: String
  website_not_ends_with: String
  events_every: EventWhereInput
  events_some: EventWhereInput
  events_none: EventWhereInput
  followers_every: UserWhereInput
  followers_some: UserWhereInput
  followers_none: UserWhereInput
  AND: [CharityWhereInput!]
  OR: [CharityWhereInput!]
  NOT: [CharityWhereInput!]
}

input CharityWhereUniqueInput {
  id: ID
  ein: String
}

type Circle {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String
  name: String!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type CircleConnection {
  pageInfo: PageInfo!
  edges: [CircleEdge]!
  aggregate: AggregateCircle!
}

input CircleCreateInput {
  description: String
  name: String!
  users: UserCreateManyWithoutCirclesInput
}

input CircleCreateManyWithoutUsersInput {
  create: [CircleCreateWithoutUsersInput!]
  connect: [CircleWhereUniqueInput!]
}

input CircleCreateWithoutUsersInput {
  description: String
  name: String!
}

type CircleEdge {
  node: Circle!
  cursor: String!
}

enum CircleOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  description_ASC
  description_DESC
  name_ASC
  name_DESC
}

type CirclePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String
  name: String!
}

type CircleSubscriptionPayload {
  mutation: MutationType!
  node: Circle
  updatedFields: [String!]
  previousValues: CirclePreviousValues
}

input CircleSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CircleWhereInput
  AND: [CircleSubscriptionWhereInput!]
  OR: [CircleSubscriptionWhereInput!]
  NOT: [CircleSubscriptionWhereInput!]
}

input CircleUpdateInput {
  description: String
  name: String
  users: UserUpdateManyWithoutCirclesInput
}

input CircleUpdateManyWithoutUsersInput {
  create: [CircleCreateWithoutUsersInput!]
  delete: [CircleWhereUniqueInput!]
  connect: [CircleWhereUniqueInput!]
  disconnect: [CircleWhereUniqueInput!]
  update: [CircleUpdateWithWhereUniqueWithoutUsersInput!]
  upsert: [CircleUpsertWithWhereUniqueWithoutUsersInput!]
}

input CircleUpdateWithoutUsersDataInput {
  description: String
  name: String
}

input CircleUpdateWithWhereUniqueWithoutUsersInput {
  where: CircleWhereUniqueInput!
  data: CircleUpdateWithoutUsersDataInput!
}

input CircleUpsertWithWhereUniqueWithoutUsersInput {
  where: CircleWhereUniqueInput!
  update: CircleUpdateWithoutUsersDataInput!
  create: CircleCreateWithoutUsersInput!
}

input CircleWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  users_every: UserWhereInput
  users_some: UserWhereInput
  users_none: UserWhereInput
  AND: [CircleWhereInput!]
  OR: [CircleWhereInput!]
  NOT: [CircleWhereInput!]
}

input CircleWhereUniqueInput {
  id: ID
}

scalar DateTime

type Dot {
  id: ID!
  createdAt: DateTime!
  action: String!
  amount: Int!
  total: Int!
  user: User!
}

type DotConnection {
  pageInfo: PageInfo!
  edges: [DotEdge]!
  aggregate: AggregateDot!
}

input DotCreateInput {
  action: String!
  amount: Int!
  total: Int!
  user: UserCreateOneWithoutDotsInput!
}

input DotCreateManyWithoutUserInput {
  create: [DotCreateWithoutUserInput!]
  connect: [DotWhereUniqueInput!]
}

input DotCreateWithoutUserInput {
  action: String!
  amount: Int!
  total: Int!
}

type DotEdge {
  node: Dot!
  cursor: String!
}

enum DotOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  action_ASC
  action_DESC
  amount_ASC
  amount_DESC
  total_ASC
  total_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type DotPreviousValues {
  id: ID!
  createdAt: DateTime!
  action: String!
  amount: Int!
  total: Int!
}

type DotSubscriptionPayload {
  mutation: MutationType!
  node: Dot
  updatedFields: [String!]
  previousValues: DotPreviousValues
}

input DotSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: DotWhereInput
  AND: [DotSubscriptionWhereInput!]
  OR: [DotSubscriptionWhereInput!]
  NOT: [DotSubscriptionWhereInput!]
}

input DotUpdateInput {
  action: String
  amount: Int
  total: Int
  user: UserUpdateOneRequiredWithoutDotsInput
}

input DotUpdateManyWithoutUserInput {
  create: [DotCreateWithoutUserInput!]
  delete: [DotWhereUniqueInput!]
  connect: [DotWhereUniqueInput!]
  disconnect: [DotWhereUniqueInput!]
  update: [DotUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [DotUpsertWithWhereUniqueWithoutUserInput!]
}

input DotUpdateWithoutUserDataInput {
  action: String
  amount: Int
  total: Int
}

input DotUpdateWithWhereUniqueWithoutUserInput {
  where: DotWhereUniqueInput!
  data: DotUpdateWithoutUserDataInput!
}

input DotUpsertWithWhereUniqueWithoutUserInput {
  where: DotWhereUniqueInput!
  update: DotUpdateWithoutUserDataInput!
  create: DotCreateWithoutUserInput!
}

input DotWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  action: String
  action_not: String
  action_in: [String!]
  action_not_in: [String!]
  action_lt: String
  action_lte: String
  action_gt: String
  action_gte: String
  action_contains: String
  action_not_contains: String
  action_starts_with: String
  action_not_starts_with: String
  action_ends_with: String
  action_not_ends_with: String
  amount: Int
  amount_not: Int
  amount_in: [Int!]
  amount_not_in: [Int!]
  amount_lt: Int
  amount_lte: Int
  amount_gt: Int
  amount_gte: Int
  total: Int
  total_not: Int
  total_in: [Int!]
  total_not_in: [Int!]
  total_lt: Int
  total_lte: Int
  total_gt: Int
  total_gte: Int
  user: UserWhereInput
  AND: [DotWhereInput!]
  OR: [DotWhereInput!]
  NOT: [DotWhereInput!]
}

input DotWhereUniqueInput {
  id: ID
}

type Event {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  endDate: DateTime!
  goal: Int!
  multiplier: Int
  sponsorName: String
  sponsorWebsite: String
  startDate: DateTime!
  charity: Charity
  specialFundraiser: SpecialFundraiser
  donations(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transaction!]
}

type EventConnection {
  pageInfo: PageInfo!
  edges: [EventEdge]!
  aggregate: AggregateEvent!
}

input EventCreateInput {
  endDate: DateTime!
  goal: Int!
  multiplier: Int
  sponsorName: String
  sponsorWebsite: String
  startDate: DateTime!
  charity: CharityCreateOneWithoutEventsInput
  specialFundraiser: SpecialFundraiserCreateOneWithoutEventInput
  donations: TransactionCreateManyWithoutEventInput
}

input EventCreateManyWithoutCharityInput {
  create: [EventCreateWithoutCharityInput!]
  connect: [EventWhereUniqueInput!]
}

input EventCreateOneInput {
  create: EventCreateInput
  connect: EventWhereUniqueInput
}

input EventCreateOneWithoutDonationsInput {
  create: EventCreateWithoutDonationsInput
  connect: EventWhereUniqueInput
}

input EventCreateOneWithoutSpecialFundraiserInput {
  create: EventCreateWithoutSpecialFundraiserInput
  connect: EventWhereUniqueInput
}

input EventCreateWithoutCharityInput {
  endDate: DateTime!
  goal: Int!
  multiplier: Int
  sponsorName: String
  sponsorWebsite: String
  startDate: DateTime!
  specialFundraiser: SpecialFundraiserCreateOneWithoutEventInput
  donations: TransactionCreateManyWithoutEventInput
}

input EventCreateWithoutDonationsInput {
  endDate: DateTime!
  goal: Int!
  multiplier: Int
  sponsorName: String
  sponsorWebsite: String
  startDate: DateTime!
  charity: CharityCreateOneWithoutEventsInput
  specialFundraiser: SpecialFundraiserCreateOneWithoutEventInput
}

input EventCreateWithoutSpecialFundraiserInput {
  endDate: DateTime!
  goal: Int!
  multiplier: Int
  sponsorName: String
  sponsorWebsite: String
  startDate: DateTime!
  charity: CharityCreateOneWithoutEventsInput
  donations: TransactionCreateManyWithoutEventInput
}

type EventEdge {
  node: Event!
  cursor: String!
}

enum EventOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  endDate_ASC
  endDate_DESC
  goal_ASC
  goal_DESC
  multiplier_ASC
  multiplier_DESC
  sponsorName_ASC
  sponsorName_DESC
  sponsorWebsite_ASC
  sponsorWebsite_DESC
  startDate_ASC
  startDate_DESC
}

type EventPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  endDate: DateTime!
  goal: Int!
  multiplier: Int
  sponsorName: String
  sponsorWebsite: String
  startDate: DateTime!
}

type EventSubscriptionPayload {
  mutation: MutationType!
  node: Event
  updatedFields: [String!]
  previousValues: EventPreviousValues
}

input EventSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EventWhereInput
  AND: [EventSubscriptionWhereInput!]
  OR: [EventSubscriptionWhereInput!]
  NOT: [EventSubscriptionWhereInput!]
}

input EventUpdateDataInput {
  endDate: DateTime
  goal: Int
  multiplier: Int
  sponsorName: String
  sponsorWebsite: String
  startDate: DateTime
  charity: CharityUpdateOneWithoutEventsInput
  specialFundraiser: SpecialFundraiserUpdateOneWithoutEventInput
  donations: TransactionUpdateManyWithoutEventInput
}

input EventUpdateInput {
  endDate: DateTime
  goal: Int
  multiplier: Int
  sponsorName: String
  sponsorWebsite: String
  startDate: DateTime
  charity: CharityUpdateOneWithoutEventsInput
  specialFundraiser: SpecialFundraiserUpdateOneWithoutEventInput
  donations: TransactionUpdateManyWithoutEventInput
}

input EventUpdateManyWithoutCharityInput {
  create: [EventCreateWithoutCharityInput!]
  delete: [EventWhereUniqueInput!]
  connect: [EventWhereUniqueInput!]
  disconnect: [EventWhereUniqueInput!]
  update: [EventUpdateWithWhereUniqueWithoutCharityInput!]
  upsert: [EventUpsertWithWhereUniqueWithoutCharityInput!]
}

input EventUpdateOneRequiredInput {
  create: EventCreateInput
  update: EventUpdateDataInput
  upsert: EventUpsertNestedInput
  connect: EventWhereUniqueInput
}

input EventUpdateOneRequiredWithoutSpecialFundraiserInput {
  create: EventCreateWithoutSpecialFundraiserInput
  update: EventUpdateWithoutSpecialFundraiserDataInput
  upsert: EventUpsertWithoutSpecialFundraiserInput
  connect: EventWhereUniqueInput
}

input EventUpdateOneWithoutDonationsInput {
  create: EventCreateWithoutDonationsInput
  update: EventUpdateWithoutDonationsDataInput
  upsert: EventUpsertWithoutDonationsInput
  delete: Boolean
  disconnect: Boolean
  connect: EventWhereUniqueInput
}

input EventUpdateWithoutCharityDataInput {
  endDate: DateTime
  goal: Int
  multiplier: Int
  sponsorName: String
  sponsorWebsite: String
  startDate: DateTime
  specialFundraiser: SpecialFundraiserUpdateOneWithoutEventInput
  donations: TransactionUpdateManyWithoutEventInput
}

input EventUpdateWithoutDonationsDataInput {
  endDate: DateTime
  goal: Int
  multiplier: Int
  sponsorName: String
  sponsorWebsite: String
  startDate: DateTime
  charity: CharityUpdateOneWithoutEventsInput
  specialFundraiser: SpecialFundraiserUpdateOneWithoutEventInput
}

input EventUpdateWithoutSpecialFundraiserDataInput {
  endDate: DateTime
  goal: Int
  multiplier: Int
  sponsorName: String
  sponsorWebsite: String
  startDate: DateTime
  charity: CharityUpdateOneWithoutEventsInput
  donations: TransactionUpdateManyWithoutEventInput
}

input EventUpdateWithWhereUniqueWithoutCharityInput {
  where: EventWhereUniqueInput!
  data: EventUpdateWithoutCharityDataInput!
}

input EventUpsertNestedInput {
  update: EventUpdateDataInput!
  create: EventCreateInput!
}

input EventUpsertWithoutDonationsInput {
  update: EventUpdateWithoutDonationsDataInput!
  create: EventCreateWithoutDonationsInput!
}

input EventUpsertWithoutSpecialFundraiserInput {
  update: EventUpdateWithoutSpecialFundraiserDataInput!
  create: EventCreateWithoutSpecialFundraiserInput!
}

input EventUpsertWithWhereUniqueWithoutCharityInput {
  where: EventWhereUniqueInput!
  update: EventUpdateWithoutCharityDataInput!
  create: EventCreateWithoutCharityInput!
}

input EventWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  endDate: DateTime
  endDate_not: DateTime
  endDate_in: [DateTime!]
  endDate_not_in: [DateTime!]
  endDate_lt: DateTime
  endDate_lte: DateTime
  endDate_gt: DateTime
  endDate_gte: DateTime
  goal: Int
  goal_not: Int
  goal_in: [Int!]
  goal_not_in: [Int!]
  goal_lt: Int
  goal_lte: Int
  goal_gt: Int
  goal_gte: Int
  multiplier: Int
  multiplier_not: Int
  multiplier_in: [Int!]
  multiplier_not_in: [Int!]
  multiplier_lt: Int
  multiplier_lte: Int
  multiplier_gt: Int
  multiplier_gte: Int
  sponsorName: String
  sponsorName_not: String
  sponsorName_in: [String!]
  sponsorName_not_in: [String!]
  sponsorName_lt: String
  sponsorName_lte: String
  sponsorName_gt: String
  sponsorName_gte: String
  sponsorName_contains: String
  sponsorName_not_contains: String
  sponsorName_starts_with: String
  sponsorName_not_starts_with: String
  sponsorName_ends_with: String
  sponsorName_not_ends_with: String
  sponsorWebsite: String
  sponsorWebsite_not: String
  sponsorWebsite_in: [String!]
  sponsorWebsite_not_in: [String!]
  sponsorWebsite_lt: String
  sponsorWebsite_lte: String
  sponsorWebsite_gt: String
  sponsorWebsite_gte: String
  sponsorWebsite_contains: String
  sponsorWebsite_not_contains: String
  sponsorWebsite_starts_with: String
  sponsorWebsite_not_starts_with: String
  sponsorWebsite_ends_with: String
  sponsorWebsite_not_ends_with: String
  startDate: DateTime
  startDate_not: DateTime
  startDate_in: [DateTime!]
  startDate_not_in: [DateTime!]
  startDate_lt: DateTime
  startDate_lte: DateTime
  startDate_gt: DateTime
  startDate_gte: DateTime
  charity: CharityWhereInput
  specialFundraiser: SpecialFundraiserWhereInput
  donations_every: TransactionWhereInput
  donations_some: TransactionWhereInput
  donations_none: TransactionWhereInput
  AND: [EventWhereInput!]
  OR: [EventWhereInput!]
  NOT: [EventWhereInput!]
}

input EventWhereUniqueInput {
  id: ID
}

type Halo {
  id: ID!
  createdAt: DateTime!
  key: String!
  user: User!
}

type HaloConnection {
  pageInfo: PageInfo!
  edges: [HaloEdge]!
  aggregate: AggregateHalo!
}

input HaloCreateInput {
  key: String!
  user: UserCreateOneWithoutHalosInput!
}

input HaloCreateManyWithoutUserInput {
  create: [HaloCreateWithoutUserInput!]
  connect: [HaloWhereUniqueInput!]
}

input HaloCreateWithoutUserInput {
  key: String!
}

type HaloEdge {
  node: Halo!
  cursor: String!
}

enum HaloOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  key_ASC
  key_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type HaloPreviousValues {
  id: ID!
  createdAt: DateTime!
  key: String!
}

type HaloSubscriptionPayload {
  mutation: MutationType!
  node: Halo
  updatedFields: [String!]
  previousValues: HaloPreviousValues
}

input HaloSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: HaloWhereInput
  AND: [HaloSubscriptionWhereInput!]
  OR: [HaloSubscriptionWhereInput!]
  NOT: [HaloSubscriptionWhereInput!]
}

input HaloUpdateInput {
  key: String
  user: UserUpdateOneRequiredWithoutHalosInput
}

input HaloUpdateManyWithoutUserInput {
  create: [HaloCreateWithoutUserInput!]
  delete: [HaloWhereUniqueInput!]
  connect: [HaloWhereUniqueInput!]
  disconnect: [HaloWhereUniqueInput!]
  update: [HaloUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [HaloUpsertWithWhereUniqueWithoutUserInput!]
}

input HaloUpdateWithoutUserDataInput {
  key: String
}

input HaloUpdateWithWhereUniqueWithoutUserInput {
  where: HaloWhereUniqueInput!
  data: HaloUpdateWithoutUserDataInput!
}

input HaloUpsertWithWhereUniqueWithoutUserInput {
  where: HaloWhereUniqueInput!
  update: HaloUpdateWithoutUserDataInput!
  create: HaloCreateWithoutUserInput!
}

input HaloWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  key: String
  key_not: String
  key_in: [String!]
  key_not_in: [String!]
  key_lt: String
  key_lte: String
  key_gt: String
  key_gte: String
  key_contains: String
  key_not_contains: String
  key_starts_with: String
  key_not_starts_with: String
  key_ends_with: String
  key_not_ends_with: String
  user: UserWhereInput
  AND: [HaloWhereInput!]
  OR: [HaloWhereInput!]
  NOT: [HaloWhereInput!]
}

input HaloWhereUniqueInput {
  id: ID
}

type Identity {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  provider: IdentityProvider!
  providerID: String!
  user: User!
}

type IdentityConnection {
  pageInfo: PageInfo!
  edges: [IdentityEdge]!
  aggregate: AggregateIdentity!
}

input IdentityCreateInput {
  provider: IdentityProvider!
  providerID: String!
  user: UserCreateOneWithoutIdentityInput!
}

input IdentityCreateOneWithoutUserInput {
  create: IdentityCreateWithoutUserInput
  connect: IdentityWhereUniqueInput
}

input IdentityCreateWithoutUserInput {
  provider: IdentityProvider!
  providerID: String!
}

type IdentityEdge {
  node: Identity!
  cursor: String!
}

enum IdentityOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  provider_ASC
  provider_DESC
  providerID_ASC
  providerID_DESC
}

type IdentityPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  provider: IdentityProvider!
  providerID: String!
}

enum IdentityProvider {
  FACEBOOK
  GOOGLE
}

type IdentitySubscriptionPayload {
  mutation: MutationType!
  node: Identity
  updatedFields: [String!]
  previousValues: IdentityPreviousValues
}

input IdentitySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: IdentityWhereInput
  AND: [IdentitySubscriptionWhereInput!]
  OR: [IdentitySubscriptionWhereInput!]
  NOT: [IdentitySubscriptionWhereInput!]
}

input IdentityUpdateInput {
  provider: IdentityProvider
  providerID: String
  user: UserUpdateOneRequiredWithoutIdentityInput
}

input IdentityUpdateOneRequiredWithoutUserInput {
  create: IdentityCreateWithoutUserInput
  update: IdentityUpdateWithoutUserDataInput
  upsert: IdentityUpsertWithoutUserInput
  connect: IdentityWhereUniqueInput
}

input IdentityUpdateWithoutUserDataInput {
  provider: IdentityProvider
  providerID: String
}

input IdentityUpsertWithoutUserInput {
  update: IdentityUpdateWithoutUserDataInput!
  create: IdentityCreateWithoutUserInput!
}

input IdentityWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  provider: IdentityProvider
  provider_not: IdentityProvider
  provider_in: [IdentityProvider!]
  provider_not_in: [IdentityProvider!]
  providerID: String
  providerID_not: String
  providerID_in: [String!]
  providerID_not_in: [String!]
  providerID_lt: String
  providerID_lte: String
  providerID_gt: String
  providerID_gte: String
  providerID_contains: String
  providerID_not_contains: String
  providerID_starts_with: String
  providerID_not_starts_with: String
  providerID_ends_with: String
  providerID_not_ends_with: String
  user: UserWhereInput
  AND: [IdentityWhereInput!]
  OR: [IdentityWhereInput!]
  NOT: [IdentityWhereInput!]
}

input IdentityWhereUniqueInput {
  id: ID
  providerID: String
}

scalar Long

type Loop {
  id: ID!
  createdAt: DateTime!
  count: Int!
  event: Event!
  user: User!
}

type LoopConnection {
  pageInfo: PageInfo!
  edges: [LoopEdge]!
  aggregate: AggregateLoop!
}

input LoopCreateInput {
  count: Int!
  event: EventCreateOneInput!
  user: UserCreateOneWithoutLoopsInput!
}

input LoopCreateManyWithoutUserInput {
  create: [LoopCreateWithoutUserInput!]
  connect: [LoopWhereUniqueInput!]
}

input LoopCreateWithoutUserInput {
  count: Int!
  event: EventCreateOneInput!
}

type LoopEdge {
  node: Loop!
  cursor: String!
}

enum LoopOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  count_ASC
  count_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type LoopPreviousValues {
  id: ID!
  createdAt: DateTime!
  count: Int!
}

type LoopSubscriptionPayload {
  mutation: MutationType!
  node: Loop
  updatedFields: [String!]
  previousValues: LoopPreviousValues
}

input LoopSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: LoopWhereInput
  AND: [LoopSubscriptionWhereInput!]
  OR: [LoopSubscriptionWhereInput!]
  NOT: [LoopSubscriptionWhereInput!]
}

input LoopUpdateInput {
  count: Int
  event: EventUpdateOneRequiredInput
  user: UserUpdateOneRequiredWithoutLoopsInput
}

input LoopUpdateManyWithoutUserInput {
  create: [LoopCreateWithoutUserInput!]
  delete: [LoopWhereUniqueInput!]
  connect: [LoopWhereUniqueInput!]
  disconnect: [LoopWhereUniqueInput!]
  update: [LoopUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [LoopUpsertWithWhereUniqueWithoutUserInput!]
}

input LoopUpdateWithoutUserDataInput {
  count: Int
  event: EventUpdateOneRequiredInput
}

input LoopUpdateWithWhereUniqueWithoutUserInput {
  where: LoopWhereUniqueInput!
  data: LoopUpdateWithoutUserDataInput!
}

input LoopUpsertWithWhereUniqueWithoutUserInput {
  where: LoopWhereUniqueInput!
  update: LoopUpdateWithoutUserDataInput!
  create: LoopCreateWithoutUserInput!
}

input LoopWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  count: Int
  count_not: Int
  count_in: [Int!]
  count_not_in: [Int!]
  count_lt: Int
  count_lte: Int
  count_gt: Int
  count_gte: Int
  event: EventWhereInput
  user: UserWhereInput
  AND: [LoopWhereInput!]
  OR: [LoopWhereInput!]
  NOT: [LoopWhereInput!]
}

input LoopWhereUniqueInput {
  id: ID
}

type Mutation {
  createCharity(data: CharityCreateInput!): Charity!
  updateCharity(data: CharityUpdateInput!, where: CharityWhereUniqueInput!): Charity
  updateManyCharities(data: CharityUpdateInput!, where: CharityWhereInput): BatchPayload!
  upsertCharity(where: CharityWhereUniqueInput!, create: CharityCreateInput!, update: CharityUpdateInput!): Charity!
  deleteCharity(where: CharityWhereUniqueInput!): Charity
  deleteManyCharities(where: CharityWhereInput): BatchPayload!
  createCircle(data: CircleCreateInput!): Circle!
  updateCircle(data: CircleUpdateInput!, where: CircleWhereUniqueInput!): Circle
  updateManyCircles(data: CircleUpdateInput!, where: CircleWhereInput): BatchPayload!
  upsertCircle(where: CircleWhereUniqueInput!, create: CircleCreateInput!, update: CircleUpdateInput!): Circle!
  deleteCircle(where: CircleWhereUniqueInput!): Circle
  deleteManyCircles(where: CircleWhereInput): BatchPayload!
  createDot(data: DotCreateInput!): Dot!
  updateDot(data: DotUpdateInput!, where: DotWhereUniqueInput!): Dot
  updateManyDots(data: DotUpdateInput!, where: DotWhereInput): BatchPayload!
  upsertDot(where: DotWhereUniqueInput!, create: DotCreateInput!, update: DotUpdateInput!): Dot!
  deleteDot(where: DotWhereUniqueInput!): Dot
  deleteManyDots(where: DotWhereInput): BatchPayload!
  createEvent(data: EventCreateInput!): Event!
  updateEvent(data: EventUpdateInput!, where: EventWhereUniqueInput!): Event
  updateManyEvents(data: EventUpdateInput!, where: EventWhereInput): BatchPayload!
  upsertEvent(where: EventWhereUniqueInput!, create: EventCreateInput!, update: EventUpdateInput!): Event!
  deleteEvent(where: EventWhereUniqueInput!): Event
  deleteManyEvents(where: EventWhereInput): BatchPayload!
  createHalo(data: HaloCreateInput!): Halo!
  updateHalo(data: HaloUpdateInput!, where: HaloWhereUniqueInput!): Halo
  updateManyHaloes(data: HaloUpdateInput!, where: HaloWhereInput): BatchPayload!
  upsertHalo(where: HaloWhereUniqueInput!, create: HaloCreateInput!, update: HaloUpdateInput!): Halo!
  deleteHalo(where: HaloWhereUniqueInput!): Halo
  deleteManyHaloes(where: HaloWhereInput): BatchPayload!
  createIdentity(data: IdentityCreateInput!): Identity!
  updateIdentity(data: IdentityUpdateInput!, where: IdentityWhereUniqueInput!): Identity
  updateManyIdentities(data: IdentityUpdateInput!, where: IdentityWhereInput): BatchPayload!
  upsertIdentity(where: IdentityWhereUniqueInput!, create: IdentityCreateInput!, update: IdentityUpdateInput!): Identity!
  deleteIdentity(where: IdentityWhereUniqueInput!): Identity
  deleteManyIdentities(where: IdentityWhereInput): BatchPayload!
  createLoop(data: LoopCreateInput!): Loop!
  updateLoop(data: LoopUpdateInput!, where: LoopWhereUniqueInput!): Loop
  updateManyLoops(data: LoopUpdateInput!, where: LoopWhereInput): BatchPayload!
  upsertLoop(where: LoopWhereUniqueInput!, create: LoopCreateInput!, update: LoopUpdateInput!): Loop!
  deleteLoop(where: LoopWhereUniqueInput!): Loop
  deleteManyLoops(where: LoopWhereInput): BatchPayload!
  createPreferences(data: PreferencesCreateInput!): Preferences!
  updatePreferences(data: PreferencesUpdateInput!, where: PreferencesWhereUniqueInput!): Preferences
  updateManyPreferenceses(data: PreferencesUpdateInput!, where: PreferencesWhereInput): BatchPayload!
  upsertPreferences(where: PreferencesWhereUniqueInput!, create: PreferencesCreateInput!, update: PreferencesUpdateInput!): Preferences!
  deletePreferences(where: PreferencesWhereUniqueInput!): Preferences
  deleteManyPreferenceses(where: PreferencesWhereInput): BatchPayload!
  createSpecialFundraiser(data: SpecialFundraiserCreateInput!): SpecialFundraiser!
  updateSpecialFundraiser(data: SpecialFundraiserUpdateInput!, where: SpecialFundraiserWhereUniqueInput!): SpecialFundraiser
  updateManySpecialFundraisers(data: SpecialFundraiserUpdateInput!, where: SpecialFundraiserWhereInput): BatchPayload!
  upsertSpecialFundraiser(where: SpecialFundraiserWhereUniqueInput!, create: SpecialFundraiserCreateInput!, update: SpecialFundraiserUpdateInput!): SpecialFundraiser!
  deleteSpecialFundraiser(where: SpecialFundraiserWhereUniqueInput!): SpecialFundraiser
  deleteManySpecialFundraisers(where: SpecialFundraiserWhereInput): BatchPayload!
  createTransaction(data: TransactionCreateInput!): Transaction!
  updateTransaction(data: TransactionUpdateInput!, where: TransactionWhereUniqueInput!): Transaction
  updateManyTransactions(data: TransactionUpdateInput!, where: TransactionWhereInput): BatchPayload!
  upsertTransaction(where: TransactionWhereUniqueInput!, create: TransactionCreateInput!, update: TransactionUpdateInput!): Transaction!
  deleteTransaction(where: TransactionWhereUniqueInput!): Transaction
  deleteManyTransactions(where: TransactionWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Preferences {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  allowDonationEmails: Boolean!
  user: User!
}

type PreferencesConnection {
  pageInfo: PageInfo!
  edges: [PreferencesEdge]!
  aggregate: AggregatePreferences!
}

input PreferencesCreateInput {
  allowDonationEmails: Boolean
  user: UserCreateOneWithoutPreferencesInput!
}

input PreferencesCreateOneWithoutUserInput {
  create: PreferencesCreateWithoutUserInput
  connect: PreferencesWhereUniqueInput
}

input PreferencesCreateWithoutUserInput {
  allowDonationEmails: Boolean
}

type PreferencesEdge {
  node: Preferences!
  cursor: String!
}

enum PreferencesOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  allowDonationEmails_ASC
  allowDonationEmails_DESC
}

type PreferencesPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  allowDonationEmails: Boolean!
}

type PreferencesSubscriptionPayload {
  mutation: MutationType!
  node: Preferences
  updatedFields: [String!]
  previousValues: PreferencesPreviousValues
}

input PreferencesSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PreferencesWhereInput
  AND: [PreferencesSubscriptionWhereInput!]
  OR: [PreferencesSubscriptionWhereInput!]
  NOT: [PreferencesSubscriptionWhereInput!]
}

input PreferencesUpdateInput {
  allowDonationEmails: Boolean
  user: UserUpdateOneRequiredWithoutPreferencesInput
}

input PreferencesUpdateOneRequiredWithoutUserInput {
  create: PreferencesCreateWithoutUserInput
  update: PreferencesUpdateWithoutUserDataInput
  upsert: PreferencesUpsertWithoutUserInput
  connect: PreferencesWhereUniqueInput
}

input PreferencesUpdateWithoutUserDataInput {
  allowDonationEmails: Boolean
}

input PreferencesUpsertWithoutUserInput {
  update: PreferencesUpdateWithoutUserDataInput!
  create: PreferencesCreateWithoutUserInput!
}

input PreferencesWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  allowDonationEmails: Boolean
  allowDonationEmails_not: Boolean
  user: UserWhereInput
  AND: [PreferencesWhereInput!]
  OR: [PreferencesWhereInput!]
  NOT: [PreferencesWhereInput!]
}

input PreferencesWhereUniqueInput {
  id: ID
}

type Query {
  charity(where: CharityWhereUniqueInput!): Charity
  charities(where: CharityWhereInput, orderBy: CharityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Charity]!
  charitiesConnection(where: CharityWhereInput, orderBy: CharityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CharityConnection!
  circle(where: CircleWhereUniqueInput!): Circle
  circles(where: CircleWhereInput, orderBy: CircleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Circle]!
  circlesConnection(where: CircleWhereInput, orderBy: CircleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CircleConnection!
  dot(where: DotWhereUniqueInput!): Dot
  dots(where: DotWhereInput, orderBy: DotOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Dot]!
  dotsConnection(where: DotWhereInput, orderBy: DotOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DotConnection!
  event(where: EventWhereUniqueInput!): Event
  events(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event]!
  eventsConnection(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EventConnection!
  halo(where: HaloWhereUniqueInput!): Halo
  haloes(where: HaloWhereInput, orderBy: HaloOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Halo]!
  haloesConnection(where: HaloWhereInput, orderBy: HaloOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): HaloConnection!
  identity(where: IdentityWhereUniqueInput!): Identity
  identities(where: IdentityWhereInput, orderBy: IdentityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Identity]!
  identitiesConnection(where: IdentityWhereInput, orderBy: IdentityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): IdentityConnection!
  loop(where: LoopWhereUniqueInput!): Loop
  loops(where: LoopWhereInput, orderBy: LoopOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Loop]!
  loopsConnection(where: LoopWhereInput, orderBy: LoopOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LoopConnection!
  preferences(where: PreferencesWhereUniqueInput!): Preferences
  preferenceses(where: PreferencesWhereInput, orderBy: PreferencesOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Preferences]!
  preferencesesConnection(where: PreferencesWhereInput, orderBy: PreferencesOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PreferencesConnection!
  specialFundraiser(where: SpecialFundraiserWhereUniqueInput!): SpecialFundraiser
  specialFundraisers(where: SpecialFundraiserWhereInput, orderBy: SpecialFundraiserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SpecialFundraiser]!
  specialFundraisersConnection(where: SpecialFundraiserWhereInput, orderBy: SpecialFundraiserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SpecialFundraiserConnection!
  transaction(where: TransactionWhereUniqueInput!): Transaction
  transactions(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transaction]!
  transactionsConnection(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TransactionConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type SpecialFundraiser {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String!
  name: String!
  event: Event!
}

type SpecialFundraiserConnection {
  pageInfo: PageInfo!
  edges: [SpecialFundraiserEdge]!
  aggregate: AggregateSpecialFundraiser!
}

input SpecialFundraiserCreateInput {
  description: String!
  name: String!
  event: EventCreateOneWithoutSpecialFundraiserInput!
}

input SpecialFundraiserCreateOneWithoutEventInput {
  create: SpecialFundraiserCreateWithoutEventInput
  connect: SpecialFundraiserWhereUniqueInput
}

input SpecialFundraiserCreateWithoutEventInput {
  description: String!
  name: String!
}

type SpecialFundraiserEdge {
  node: SpecialFundraiser!
  cursor: String!
}

enum SpecialFundraiserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  description_ASC
  description_DESC
  name_ASC
  name_DESC
}

type SpecialFundraiserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  description: String!
  name: String!
}

type SpecialFundraiserSubscriptionPayload {
  mutation: MutationType!
  node: SpecialFundraiser
  updatedFields: [String!]
  previousValues: SpecialFundraiserPreviousValues
}

input SpecialFundraiserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SpecialFundraiserWhereInput
  AND: [SpecialFundraiserSubscriptionWhereInput!]
  OR: [SpecialFundraiserSubscriptionWhereInput!]
  NOT: [SpecialFundraiserSubscriptionWhereInput!]
}

input SpecialFundraiserUpdateInput {
  description: String
  name: String
  event: EventUpdateOneRequiredWithoutSpecialFundraiserInput
}

input SpecialFundraiserUpdateOneWithoutEventInput {
  create: SpecialFundraiserCreateWithoutEventInput
  update: SpecialFundraiserUpdateWithoutEventDataInput
  upsert: SpecialFundraiserUpsertWithoutEventInput
  delete: Boolean
  disconnect: Boolean
  connect: SpecialFundraiserWhereUniqueInput
}

input SpecialFundraiserUpdateWithoutEventDataInput {
  description: String
  name: String
}

input SpecialFundraiserUpsertWithoutEventInput {
  update: SpecialFundraiserUpdateWithoutEventDataInput!
  create: SpecialFundraiserCreateWithoutEventInput!
}

input SpecialFundraiserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  event: EventWhereInput
  AND: [SpecialFundraiserWhereInput!]
  OR: [SpecialFundraiserWhereInput!]
  NOT: [SpecialFundraiserWhereInput!]
}

input SpecialFundraiserWhereUniqueInput {
  id: ID
}

type Subscription {
  charity(where: CharitySubscriptionWhereInput): CharitySubscriptionPayload
  circle(where: CircleSubscriptionWhereInput): CircleSubscriptionPayload
  dot(where: DotSubscriptionWhereInput): DotSubscriptionPayload
  event(where: EventSubscriptionWhereInput): EventSubscriptionPayload
  halo(where: HaloSubscriptionWhereInput): HaloSubscriptionPayload
  identity(where: IdentitySubscriptionWhereInput): IdentitySubscriptionPayload
  loop(where: LoopSubscriptionWhereInput): LoopSubscriptionPayload
  preferences(where: PreferencesSubscriptionWhereInput): PreferencesSubscriptionPayload
  specialFundraiser(where: SpecialFundraiserSubscriptionWhereInput): SpecialFundraiserSubscriptionPayload
  transaction(where: TransactionSubscriptionWhereInput): TransactionSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Transaction {
  id: ID!
  createdAt: DateTime!
  amount: Int!
  balance: Int!
  stripeID: String
  type: TransactionType!
  event: Event
  user: User!
}

type TransactionConnection {
  pageInfo: PageInfo!
  edges: [TransactionEdge]!
  aggregate: AggregateTransaction!
}

input TransactionCreateInput {
  amount: Int!
  balance: Int!
  stripeID: String
  type: TransactionType!
  event: EventCreateOneWithoutDonationsInput
  user: UserCreateOneWithoutTransactionsInput!
}

input TransactionCreateManyWithoutEventInput {
  create: [TransactionCreateWithoutEventInput!]
  connect: [TransactionWhereUniqueInput!]
}

input TransactionCreateManyWithoutUserInput {
  create: [TransactionCreateWithoutUserInput!]
  connect: [TransactionWhereUniqueInput!]
}

input TransactionCreateWithoutEventInput {
  amount: Int!
  balance: Int!
  stripeID: String
  type: TransactionType!
  user: UserCreateOneWithoutTransactionsInput!
}

input TransactionCreateWithoutUserInput {
  amount: Int!
  balance: Int!
  stripeID: String
  type: TransactionType!
  event: EventCreateOneWithoutDonationsInput
}

type TransactionEdge {
  node: Transaction!
  cursor: String!
}

enum TransactionOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  amount_ASC
  amount_DESC
  balance_ASC
  balance_DESC
  stripeID_ASC
  stripeID_DESC
  type_ASC
  type_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TransactionPreviousValues {
  id: ID!
  createdAt: DateTime!
  amount: Int!
  balance: Int!
  stripeID: String
  type: TransactionType!
}

type TransactionSubscriptionPayload {
  mutation: MutationType!
  node: Transaction
  updatedFields: [String!]
  previousValues: TransactionPreviousValues
}

input TransactionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TransactionWhereInput
  AND: [TransactionSubscriptionWhereInput!]
  OR: [TransactionSubscriptionWhereInput!]
  NOT: [TransactionSubscriptionWhereInput!]
}

enum TransactionType {
  DONATION
  ADD_FUNDS
}

input TransactionUpdateInput {
  amount: Int
  balance: Int
  stripeID: String
  type: TransactionType
  event: EventUpdateOneWithoutDonationsInput
  user: UserUpdateOneRequiredWithoutTransactionsInput
}

input TransactionUpdateManyWithoutEventInput {
  create: [TransactionCreateWithoutEventInput!]
  delete: [TransactionWhereUniqueInput!]
  connect: [TransactionWhereUniqueInput!]
  disconnect: [TransactionWhereUniqueInput!]
  update: [TransactionUpdateWithWhereUniqueWithoutEventInput!]
  upsert: [TransactionUpsertWithWhereUniqueWithoutEventInput!]
}

input TransactionUpdateManyWithoutUserInput {
  create: [TransactionCreateWithoutUserInput!]
  delete: [TransactionWhereUniqueInput!]
  connect: [TransactionWhereUniqueInput!]
  disconnect: [TransactionWhereUniqueInput!]
  update: [TransactionUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [TransactionUpsertWithWhereUniqueWithoutUserInput!]
}

input TransactionUpdateWithoutEventDataInput {
  amount: Int
  balance: Int
  stripeID: String
  type: TransactionType
  user: UserUpdateOneRequiredWithoutTransactionsInput
}

input TransactionUpdateWithoutUserDataInput {
  amount: Int
  balance: Int
  stripeID: String
  type: TransactionType
  event: EventUpdateOneWithoutDonationsInput
}

input TransactionUpdateWithWhereUniqueWithoutEventInput {
  where: TransactionWhereUniqueInput!
  data: TransactionUpdateWithoutEventDataInput!
}

input TransactionUpdateWithWhereUniqueWithoutUserInput {
  where: TransactionWhereUniqueInput!
  data: TransactionUpdateWithoutUserDataInput!
}

input TransactionUpsertWithWhereUniqueWithoutEventInput {
  where: TransactionWhereUniqueInput!
  update: TransactionUpdateWithoutEventDataInput!
  create: TransactionCreateWithoutEventInput!
}

input TransactionUpsertWithWhereUniqueWithoutUserInput {
  where: TransactionWhereUniqueInput!
  update: TransactionUpdateWithoutUserDataInput!
  create: TransactionCreateWithoutUserInput!
}

input TransactionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  amount: Int
  amount_not: Int
  amount_in: [Int!]
  amount_not_in: [Int!]
  amount_lt: Int
  amount_lte: Int
  amount_gt: Int
  amount_gte: Int
  balance: Int
  balance_not: Int
  balance_in: [Int!]
  balance_not_in: [Int!]
  balance_lt: Int
  balance_lte: Int
  balance_gt: Int
  balance_gte: Int
  stripeID: String
  stripeID_not: String
  stripeID_in: [String!]
  stripeID_not_in: [String!]
  stripeID_lt: String
  stripeID_lte: String
  stripeID_gt: String
  stripeID_gte: String
  stripeID_contains: String
  stripeID_not_contains: String
  stripeID_starts_with: String
  stripeID_not_starts_with: String
  stripeID_ends_with: String
  stripeID_not_ends_with: String
  type: TransactionType
  type_not: TransactionType
  type_in: [TransactionType!]
  type_not_in: [TransactionType!]
  event: EventWhereInput
  user: UserWhereInput
  AND: [TransactionWhereInput!]
  OR: [TransactionWhereInput!]
  NOT: [TransactionWhereInput!]
}

input TransactionWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  bio: String
  email: String!
  nameFirst: String!
  nameLast: String!
  picture: String
  securityToken: Int!
  username: String!
  circles(where: CircleWhereInput, orderBy: CircleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Circle!]
  dots(where: DotWhereInput, orderBy: DotOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Dot!]
  followedCharities(where: CharityWhereInput, orderBy: CharityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Charity!]
  halos(where: HaloWhereInput, orderBy: HaloOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Halo!]
  identity: Identity!
  loops(where: LoopWhereInput, orderBy: LoopOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Loop!]
  preferences: Preferences!
  transactions(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transaction!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  bio: String
  email: String!
  nameFirst: String!
  nameLast: String!
  picture: String
  securityToken: Int!
  username: String!
  circles: CircleCreateManyWithoutUsersInput
  dots: DotCreateManyWithoutUserInput
  followedCharities: CharityCreateManyWithoutFollowersInput
  halos: HaloCreateManyWithoutUserInput
  identity: IdentityCreateOneWithoutUserInput!
  loops: LoopCreateManyWithoutUserInput
  preferences: PreferencesCreateOneWithoutUserInput!
  transactions: TransactionCreateManyWithoutUserInput
}

input UserCreateManyWithoutCirclesInput {
  create: [UserCreateWithoutCirclesInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateManyWithoutFollowedCharitiesInput {
  create: [UserCreateWithoutFollowedCharitiesInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneWithoutDotsInput {
  create: UserCreateWithoutDotsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutHalosInput {
  create: UserCreateWithoutHalosInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutIdentityInput {
  create: UserCreateWithoutIdentityInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutLoopsInput {
  create: UserCreateWithoutLoopsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPreferencesInput {
  create: UserCreateWithoutPreferencesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutTransactionsInput {
  create: UserCreateWithoutTransactionsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutCirclesInput {
  bio: String
  email: String!
  nameFirst: String!
  nameLast: String!
  picture: String
  securityToken: Int!
  username: String!
  dots: DotCreateManyWithoutUserInput
  followedCharities: CharityCreateManyWithoutFollowersInput
  halos: HaloCreateManyWithoutUserInput
  identity: IdentityCreateOneWithoutUserInput!
  loops: LoopCreateManyWithoutUserInput
  preferences: PreferencesCreateOneWithoutUserInput!
  transactions: TransactionCreateManyWithoutUserInput
}

input UserCreateWithoutDotsInput {
  bio: String
  email: String!
  nameFirst: String!
  nameLast: String!
  picture: String
  securityToken: Int!
  username: String!
  circles: CircleCreateManyWithoutUsersInput
  followedCharities: CharityCreateManyWithoutFollowersInput
  halos: HaloCreateManyWithoutUserInput
  identity: IdentityCreateOneWithoutUserInput!
  loops: LoopCreateManyWithoutUserInput
  preferences: PreferencesCreateOneWithoutUserInput!
  transactions: TransactionCreateManyWithoutUserInput
}

input UserCreateWithoutFollowedCharitiesInput {
  bio: String
  email: String!
  nameFirst: String!
  nameLast: String!
  picture: String
  securityToken: Int!
  username: String!
  circles: CircleCreateManyWithoutUsersInput
  dots: DotCreateManyWithoutUserInput
  halos: HaloCreateManyWithoutUserInput
  identity: IdentityCreateOneWithoutUserInput!
  loops: LoopCreateManyWithoutUserInput
  preferences: PreferencesCreateOneWithoutUserInput!
  transactions: TransactionCreateManyWithoutUserInput
}

input UserCreateWithoutHalosInput {
  bio: String
  email: String!
  nameFirst: String!
  nameLast: String!
  picture: String
  securityToken: Int!
  username: String!
  circles: CircleCreateManyWithoutUsersInput
  dots: DotCreateManyWithoutUserInput
  followedCharities: CharityCreateManyWithoutFollowersInput
  identity: IdentityCreateOneWithoutUserInput!
  loops: LoopCreateManyWithoutUserInput
  preferences: PreferencesCreateOneWithoutUserInput!
  transactions: TransactionCreateManyWithoutUserInput
}

input UserCreateWithoutIdentityInput {
  bio: String
  email: String!
  nameFirst: String!
  nameLast: String!
  picture: String
  securityToken: Int!
  username: String!
  circles: CircleCreateManyWithoutUsersInput
  dots: DotCreateManyWithoutUserInput
  followedCharities: CharityCreateManyWithoutFollowersInput
  halos: HaloCreateManyWithoutUserInput
  loops: LoopCreateManyWithoutUserInput
  preferences: PreferencesCreateOneWithoutUserInput!
  transactions: TransactionCreateManyWithoutUserInput
}

input UserCreateWithoutLoopsInput {
  bio: String
  email: String!
  nameFirst: String!
  nameLast: String!
  picture: String
  securityToken: Int!
  username: String!
  circles: CircleCreateManyWithoutUsersInput
  dots: DotCreateManyWithoutUserInput
  followedCharities: CharityCreateManyWithoutFollowersInput
  halos: HaloCreateManyWithoutUserInput
  identity: IdentityCreateOneWithoutUserInput!
  preferences: PreferencesCreateOneWithoutUserInput!
  transactions: TransactionCreateManyWithoutUserInput
}

input UserCreateWithoutPreferencesInput {
  bio: String
  email: String!
  nameFirst: String!
  nameLast: String!
  picture: String
  securityToken: Int!
  username: String!
  circles: CircleCreateManyWithoutUsersInput
  dots: DotCreateManyWithoutUserInput
  followedCharities: CharityCreateManyWithoutFollowersInput
  halos: HaloCreateManyWithoutUserInput
  identity: IdentityCreateOneWithoutUserInput!
  loops: LoopCreateManyWithoutUserInput
  transactions: TransactionCreateManyWithoutUserInput
}

input UserCreateWithoutTransactionsInput {
  bio: String
  email: String!
  nameFirst: String!
  nameLast: String!
  picture: String
  securityToken: Int!
  username: String!
  circles: CircleCreateManyWithoutUsersInput
  dots: DotCreateManyWithoutUserInput
  followedCharities: CharityCreateManyWithoutFollowersInput
  halos: HaloCreateManyWithoutUserInput
  identity: IdentityCreateOneWithoutUserInput!
  loops: LoopCreateManyWithoutUserInput
  preferences: PreferencesCreateOneWithoutUserInput!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  bio_ASC
  bio_DESC
  email_ASC
  email_DESC
  nameFirst_ASC
  nameFirst_DESC
  nameLast_ASC
  nameLast_DESC
  picture_ASC
  picture_DESC
  securityToken_ASC
  securityToken_DESC
  username_ASC
  username_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  bio: String
  email: String!
  nameFirst: String!
  nameLast: String!
  picture: String
  securityToken: Int!
  username: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  bio: String
  email: String
  nameFirst: String
  nameLast: String
  picture: String
  securityToken: Int
  username: String
  circles: CircleUpdateManyWithoutUsersInput
  dots: DotUpdateManyWithoutUserInput
  followedCharities: CharityUpdateManyWithoutFollowersInput
  halos: HaloUpdateManyWithoutUserInput
  identity: IdentityUpdateOneRequiredWithoutUserInput
  loops: LoopUpdateManyWithoutUserInput
  preferences: PreferencesUpdateOneRequiredWithoutUserInput
  transactions: TransactionUpdateManyWithoutUserInput
}

input UserUpdateManyWithoutCirclesInput {
  create: [UserCreateWithoutCirclesInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutCirclesInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutCirclesInput!]
}

input UserUpdateManyWithoutFollowedCharitiesInput {
  create: [UserCreateWithoutFollowedCharitiesInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutFollowedCharitiesInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutFollowedCharitiesInput!]
}

input UserUpdateOneRequiredWithoutDotsInput {
  create: UserCreateWithoutDotsInput
  update: UserUpdateWithoutDotsDataInput
  upsert: UserUpsertWithoutDotsInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutHalosInput {
  create: UserCreateWithoutHalosInput
  update: UserUpdateWithoutHalosDataInput
  upsert: UserUpsertWithoutHalosInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutIdentityInput {
  create: UserCreateWithoutIdentityInput
  update: UserUpdateWithoutIdentityDataInput
  upsert: UserUpsertWithoutIdentityInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutLoopsInput {
  create: UserCreateWithoutLoopsInput
  update: UserUpdateWithoutLoopsDataInput
  upsert: UserUpsertWithoutLoopsInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutPreferencesInput {
  create: UserCreateWithoutPreferencesInput
  update: UserUpdateWithoutPreferencesDataInput
  upsert: UserUpsertWithoutPreferencesInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutTransactionsInput {
  create: UserCreateWithoutTransactionsInput
  update: UserUpdateWithoutTransactionsDataInput
  upsert: UserUpsertWithoutTransactionsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutCirclesDataInput {
  bio: String
  email: String
  nameFirst: String
  nameLast: String
  picture: String
  securityToken: Int
  username: String
  dots: DotUpdateManyWithoutUserInput
  followedCharities: CharityUpdateManyWithoutFollowersInput
  halos: HaloUpdateManyWithoutUserInput
  identity: IdentityUpdateOneRequiredWithoutUserInput
  loops: LoopUpdateManyWithoutUserInput
  preferences: PreferencesUpdateOneRequiredWithoutUserInput
  transactions: TransactionUpdateManyWithoutUserInput
}

input UserUpdateWithoutDotsDataInput {
  bio: String
  email: String
  nameFirst: String
  nameLast: String
  picture: String
  securityToken: Int
  username: String
  circles: CircleUpdateManyWithoutUsersInput
  followedCharities: CharityUpdateManyWithoutFollowersInput
  halos: HaloUpdateManyWithoutUserInput
  identity: IdentityUpdateOneRequiredWithoutUserInput
  loops: LoopUpdateManyWithoutUserInput
  preferences: PreferencesUpdateOneRequiredWithoutUserInput
  transactions: TransactionUpdateManyWithoutUserInput
}

input UserUpdateWithoutFollowedCharitiesDataInput {
  bio: String
  email: String
  nameFirst: String
  nameLast: String
  picture: String
  securityToken: Int
  username: String
  circles: CircleUpdateManyWithoutUsersInput
  dots: DotUpdateManyWithoutUserInput
  halos: HaloUpdateManyWithoutUserInput
  identity: IdentityUpdateOneRequiredWithoutUserInput
  loops: LoopUpdateManyWithoutUserInput
  preferences: PreferencesUpdateOneRequiredWithoutUserInput
  transactions: TransactionUpdateManyWithoutUserInput
}

input UserUpdateWithoutHalosDataInput {
  bio: String
  email: String
  nameFirst: String
  nameLast: String
  picture: String
  securityToken: Int
  username: String
  circles: CircleUpdateManyWithoutUsersInput
  dots: DotUpdateManyWithoutUserInput
  followedCharities: CharityUpdateManyWithoutFollowersInput
  identity: IdentityUpdateOneRequiredWithoutUserInput
  loops: LoopUpdateManyWithoutUserInput
  preferences: PreferencesUpdateOneRequiredWithoutUserInput
  transactions: TransactionUpdateManyWithoutUserInput
}

input UserUpdateWithoutIdentityDataInput {
  bio: String
  email: String
  nameFirst: String
  nameLast: String
  picture: String
  securityToken: Int
  username: String
  circles: CircleUpdateManyWithoutUsersInput
  dots: DotUpdateManyWithoutUserInput
  followedCharities: CharityUpdateManyWithoutFollowersInput
  halos: HaloUpdateManyWithoutUserInput
  loops: LoopUpdateManyWithoutUserInput
  preferences: PreferencesUpdateOneRequiredWithoutUserInput
  transactions: TransactionUpdateManyWithoutUserInput
}

input UserUpdateWithoutLoopsDataInput {
  bio: String
  email: String
  nameFirst: String
  nameLast: String
  picture: String
  securityToken: Int
  username: String
  circles: CircleUpdateManyWithoutUsersInput
  dots: DotUpdateManyWithoutUserInput
  followedCharities: CharityUpdateManyWithoutFollowersInput
  halos: HaloUpdateManyWithoutUserInput
  identity: IdentityUpdateOneRequiredWithoutUserInput
  preferences: PreferencesUpdateOneRequiredWithoutUserInput
  transactions: TransactionUpdateManyWithoutUserInput
}

input UserUpdateWithoutPreferencesDataInput {
  bio: String
  email: String
  nameFirst: String
  nameLast: String
  picture: String
  securityToken: Int
  username: String
  circles: CircleUpdateManyWithoutUsersInput
  dots: DotUpdateManyWithoutUserInput
  followedCharities: CharityUpdateManyWithoutFollowersInput
  halos: HaloUpdateManyWithoutUserInput
  identity: IdentityUpdateOneRequiredWithoutUserInput
  loops: LoopUpdateManyWithoutUserInput
  transactions: TransactionUpdateManyWithoutUserInput
}

input UserUpdateWithoutTransactionsDataInput {
  bio: String
  email: String
  nameFirst: String
  nameLast: String
  picture: String
  securityToken: Int
  username: String
  circles: CircleUpdateManyWithoutUsersInput
  dots: DotUpdateManyWithoutUserInput
  followedCharities: CharityUpdateManyWithoutFollowersInput
  halos: HaloUpdateManyWithoutUserInput
  identity: IdentityUpdateOneRequiredWithoutUserInput
  loops: LoopUpdateManyWithoutUserInput
  preferences: PreferencesUpdateOneRequiredWithoutUserInput
}

input UserUpdateWithWhereUniqueWithoutCirclesInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutCirclesDataInput!
}

input UserUpdateWithWhereUniqueWithoutFollowedCharitiesInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutFollowedCharitiesDataInput!
}

input UserUpsertWithoutDotsInput {
  update: UserUpdateWithoutDotsDataInput!
  create: UserCreateWithoutDotsInput!
}

input UserUpsertWithoutHalosInput {
  update: UserUpdateWithoutHalosDataInput!
  create: UserCreateWithoutHalosInput!
}

input UserUpsertWithoutIdentityInput {
  update: UserUpdateWithoutIdentityDataInput!
  create: UserCreateWithoutIdentityInput!
}

input UserUpsertWithoutLoopsInput {
  update: UserUpdateWithoutLoopsDataInput!
  create: UserCreateWithoutLoopsInput!
}

input UserUpsertWithoutPreferencesInput {
  update: UserUpdateWithoutPreferencesDataInput!
  create: UserCreateWithoutPreferencesInput!
}

input UserUpsertWithoutTransactionsInput {
  update: UserUpdateWithoutTransactionsDataInput!
  create: UserCreateWithoutTransactionsInput!
}

input UserUpsertWithWhereUniqueWithoutCirclesInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutCirclesDataInput!
  create: UserCreateWithoutCirclesInput!
}

input UserUpsertWithWhereUniqueWithoutFollowedCharitiesInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutFollowedCharitiesDataInput!
  create: UserCreateWithoutFollowedCharitiesInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  bio: String
  bio_not: String
  bio_in: [String!]
  bio_not_in: [String!]
  bio_lt: String
  bio_lte: String
  bio_gt: String
  bio_gte: String
  bio_contains: String
  bio_not_contains: String
  bio_starts_with: String
  bio_not_starts_with: String
  bio_ends_with: String
  bio_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  nameFirst: String
  nameFirst_not: String
  nameFirst_in: [String!]
  nameFirst_not_in: [String!]
  nameFirst_lt: String
  nameFirst_lte: String
  nameFirst_gt: String
  nameFirst_gte: String
  nameFirst_contains: String
  nameFirst_not_contains: String
  nameFirst_starts_with: String
  nameFirst_not_starts_with: String
  nameFirst_ends_with: String
  nameFirst_not_ends_with: String
  nameLast: String
  nameLast_not: String
  nameLast_in: [String!]
  nameLast_not_in: [String!]
  nameLast_lt: String
  nameLast_lte: String
  nameLast_gt: String
  nameLast_gte: String
  nameLast_contains: String
  nameLast_not_contains: String
  nameLast_starts_with: String
  nameLast_not_starts_with: String
  nameLast_ends_with: String
  nameLast_not_ends_with: String
  picture: String
  picture_not: String
  picture_in: [String!]
  picture_not_in: [String!]
  picture_lt: String
  picture_lte: String
  picture_gt: String
  picture_gte: String
  picture_contains: String
  picture_not_contains: String
  picture_starts_with: String
  picture_not_starts_with: String
  picture_ends_with: String
  picture_not_ends_with: String
  securityToken: Int
  securityToken_not: Int
  securityToken_in: [Int!]
  securityToken_not_in: [Int!]
  securityToken_lt: Int
  securityToken_lte: Int
  securityToken_gt: Int
  securityToken_gte: Int
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  circles_every: CircleWhereInput
  circles_some: CircleWhereInput
  circles_none: CircleWhereInput
  dots_every: DotWhereInput
  dots_some: DotWhereInput
  dots_none: DotWhereInput
  followedCharities_every: CharityWhereInput
  followedCharities_some: CharityWhereInput
  followedCharities_none: CharityWhereInput
  halos_every: HaloWhereInput
  halos_some: HaloWhereInput
  halos_none: HaloWhereInput
  identity: IdentityWhereInput
  loops_every: LoopWhereInput
  loops_some: LoopWhereInput
  loops_none: LoopWhereInput
  preferences: PreferencesWhereInput
  transactions_every: TransactionWhereInput
  transactions_some: TransactionWhereInput
  transactions_none: TransactionWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  username: String
}
`
      }
    