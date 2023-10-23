export interface IChannelType {
  id: number;
  channelsTypeCode?: string | null;
  channelTypes?: string | null;
  channelTypeDetails?: string | null;
}

export type NewChannelType = Omit<IChannelType, 'id'> & { id: null };
