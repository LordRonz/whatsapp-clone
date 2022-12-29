import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { api, GetRoomsResult } from "../services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { Room, RoomModel, RoomSnapshotIn } from "./Room"

/**
 * Model description here for TypeScript hints.
 */
export const RoomStoreModel = types
  .model("RoomStore")
  .props({ rooms: types.optional(types.array(RoomModel), []) })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveRooms: (roomSnapshots: RoomSnapshotIn[]) => {
      const roomModels: Room[] = roomSnapshots.map((c) => RoomModel.create(c)) // create model instances from the plain objects
      self.rooms.replace(roomModels) // Replace the existing data with the new data
    },
  }))
  .actions((self) => ({
    getRooms: flow(function* () {
      const result: GetRoomsResult = yield api.getRooms()

      if (result.kind === "ok") {
        self.saveRooms(result.rooms)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))

export interface RoomStore extends Instance<typeof RoomStoreModel> {}
export interface RoomStoreSnapshotOut extends SnapshotOut<typeof RoomStoreModel> {}
export interface RoomStoreSnapshotIn extends SnapshotIn<typeof RoomStoreModel> {}
export const createRoomStoreDefaultModel = () => types.optional(RoomStoreModel, {})
