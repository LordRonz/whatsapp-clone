import { RoomStoreModel } from "./RoomStore"

test("can be created", () => {
  const instance = RoomStoreModel.create({})

  expect(instance).toBeTruthy()
})
