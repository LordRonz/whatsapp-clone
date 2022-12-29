import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { GetMessagesResult, api } from "../services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { Message, MessageModel, MessageSnapshotIn } from "./Message"

/**
 * Model description here for TypeScript hints.
 */
export const MessageStoreModel = types
  .model("MessageStore")
  .props({
    messages: types.optional(types.array(MessageModel), []),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveMessages: (messageSnapshots: MessageSnapshotIn[]) => {
      const messageModels: Message[] = messageSnapshots.map((c) => MessageModel.create(c)) // create model instances from the plain objects
      self.messages.replace(messageModels) // Replace the existing data with the new data
    },
  }))
  .actions((self) => ({
    getMessages: flow(function* (roomId: string) {
      const result: GetMessagesResult = yield api.getMessages(roomId)

      if (result.kind === "ok") {
        self.saveMessages(result.messages)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))

export interface MessageStore extends Instance<typeof MessageStoreModel> {}
export interface MessageStoreSnapshotOut extends SnapshotOut<typeof MessageStoreModel> {}
export interface MessageStoreSnapshotIn extends SnapshotIn<typeof MessageStoreModel> {}
export const createMessageStoreDefaultModel = () => types.optional(MessageStoreModel, {})
