import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const RoomModel = types
  .model("Room")
  .props({
    id: types.string,
    createdAt: types.string,
    name: types.string,
    image: types.string,
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Room extends Instance<typeof RoomModel> {}
export interface RoomSnapshotOut extends SnapshotOut<typeof RoomModel> {}
export interface RoomSnapshotIn extends SnapshotIn<typeof RoomModel> {}
export const createRoomDefaultModel = () => types.optional(RoomModel, {})
