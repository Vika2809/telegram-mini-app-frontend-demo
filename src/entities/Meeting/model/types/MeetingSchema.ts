export interface IMeetingResponse {
    id: number;
    uniqueId: string;
    name: string;
    thumb: string;
    desc: string;
    participants: number;
    distance: string;
    prize: number;
    location: string;
    status: string;
    date: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
    races: IRace[];
    ticketPrice: string;
}

export interface IRace {
    id: number;
    course: string;
    uniqueId: string;
    num: number;
    name: string;
    distance: string;
    desc: string;
    timeoff: string;
    grade: string;
    status: string;
    meetingId: number;
    createdAt: string;
    updatedAt: string;
    type: string;
}

export interface IMeetingsDto {
    from: string;
    to: string;
}

export interface IMeetingByIdDto {
    uniqueId: string;
}
