export type Thread = {
  id: number;
  title: string;
  author: string;
  body: string;
  createdAt: Date;
};

export type ThreadPayload = Omit<Thread, 'id'>;
