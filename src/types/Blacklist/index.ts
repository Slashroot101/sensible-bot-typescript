export type Blacklist = {
    word: string;
    discordGuildId: string;
    id: string;
}

export type BlacklistCreateResponse = {
    blacklist: Blacklist[];
}

export type BlacklistCreateRequest = {
    blacklist: BlacklistBeforeCreate;
}

export type BlacklistBeforeCreate = {
    word: string;
}

export type BlacklistDeleteRequest = {
    blacklist: BlacklistBeforeCreate;
}