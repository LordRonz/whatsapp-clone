import { GeneralApiProblem } from "./apiProblem"

/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}

export interface Room {
  id:        string;
  createdAt: string;
  name:      string;
  image:     string;
}

export interface Message {
  id:        string;
  RoomId:    string;
  createdAt: string;
  name:      string;
  avatar:    string;
  message:   string;
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

export type GetRoomsResult = { kind: "ok"; rooms: Room[] } | GeneralApiProblem;
export type GetRoomResult = { kind: "ok"; room: Room } | GeneralApiProblem
export type GetMessagesResult = { kind: "ok"; messages: Message[] } | GeneralApiProblem
export type GetMessageResult = { kind: "ok"; message: Message } | GeneralApiProblem
