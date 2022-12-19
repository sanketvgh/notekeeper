type ID = string;
type TimeStamp = number;

type Action<TAction, TPayload> = {
  type: TAction[keyof TAction];
  payload: TPayload;
};
