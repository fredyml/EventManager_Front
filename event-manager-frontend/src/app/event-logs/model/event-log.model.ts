export interface EventLog {
    isNew?: boolean;
    id: number;
    date: string;
    description: string;
    eventTypeId: number;
    eventType: {
        id: number;
        name: string;
    }
}
