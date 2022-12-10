import { Audit } from "../Shared/Audit";
import { Id } from "../Shared/Id";

export type Blacklist = {
    word: string;
    discordGuildId: string;
    id: Id;
    audit: Audit;
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