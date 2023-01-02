import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleProp, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Button, Header, ListItem, Screen, TextField } from "../components"
import { MaterialIcons } from "@expo/vector-icons"
import { Room, useStores } from "../models"
import { colors } from "../theme"
import { Overlay } from "@rneui/themed"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

const AddRoomButtonStyle: StyleProp<ViewStyle> = {
  borderRadius: 9999,
  width: 60,
  height: 60,
  padding: 0,
  backgroundColor: colors.palette.whatsappgreen500,
  borderWidth: 0,
  paddingHorizontal: 0,
  paddingVertical: 0,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}

const AddRoomButtonPressedStyle: StyleProp<ViewStyle> = {
  backgroundColor: colors.palette.whatsappgreen300,
}

const Wrapper: StyleProp<ViewStyle> = {
  flex: 1,
}

const AddRoomWrapper: StyleProp<ViewStyle> = {
  position: "absolute",
  bottom: 15,
  right: 15,
  alignSelf: "flex-end",
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Room: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Room" component={RoomScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const RoomScreen: FC<StackScreenProps<AppStackScreenProps, "Room">> = observer(
  function RoomScreen({ navigation }) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const { roomStore } = useStores()

    useEffect(() => {
      fetchRooms()
    }, [])

    const [input, setInput] = useState("")

    const [visible, setVisible] = useState(false)

    const toggleOverlay = () => {
      setVisible(!visible)
    }

    const fetchRooms = () => {
      roomStore.getRooms()
    }

    const submitRoom = async () => {
      if (!input || input.length < 1) {
        return
      }
      const room = {
        name: input,
        image: "",
      } as Omit<Room, "id" | "createdAt">
      await roomStore.addRoom(room)
      toggleOverlay()
    }

    return (
      <View style={Wrapper}>
        <Screen
          style={$root}
          preset="scroll"
          safeAreaEdges={["top"]}
          ScrollViewProps={{ stickyHeaderIndices: [0] }}
        >
          <Header title="WhatsApp" safeAreaEdges={[]} />
          {roomStore.rooms.map(({ name, id }, i) => (
            <ListItem
              key={`${name}-${i}`}
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.push("Message", {
                  roomId: id,
                  roomName: name,
                })
              }}
            >
              {name}
            </ListItem>
          ))}
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <TextField
              label="Room Name"
              placeholder="Enter room name"
              value={input}
              onChangeText={(value) => setInput(value)}
            />
            <Button onPress={() => submitRoom()}>Submit</Button>
          </Overlay>
        </Screen>
        <View style={AddRoomWrapper}>
          <Button
            style={AddRoomButtonStyle}
            pressedStyle={AddRoomButtonPressedStyle}
            onPress={() => toggleOverlay()}
          >
            <MaterialIcons name="chat" size={22} color="white" />
          </Button>
        </View>
      </View>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
