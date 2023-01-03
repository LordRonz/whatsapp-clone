import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleProp, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { MaterialIcons } from "@expo/vector-icons"
import { Button, Header, ListItem, Screen, TextField } from "../components"
import { Message, useStores } from "../models"
import { colors } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

const MessageWrapper: StyleProp<ViewStyle> = {
  flex: 1,
  flexDirection: "row",
}

const Wrapper: StyleProp<ViewStyle> = {
  flex: 1,
}

const SendMessageButtonStyle: StyleProp<ViewStyle> = {
  borderRadius: 9999,
  width: 40,
  height: 40,
  maxWidth: 40,
  minHeight: 0,
  backgroundColor: colors.palette.whatsappgreen500,
  borderWidth: 0,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 0,
  paddingVertical: 0,
}

const SendMessageButtonPressedStyle: StyleProp<ViewStyle> = {
  backgroundColor: colors.palette.whatsappgreen300,
}

const MessageFieldStyle: StyleProp<ViewStyle> = {
  borderRadius: 100,
  flex: 1,
  marginRight: 8,
}

const InputWrapper: StyleProp<ViewStyle> = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#fff",
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Message: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Message" component={MessageScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const MessageScreen: FC<StackScreenProps<AppStackScreenProps, "Message">> = observer(
  function MessageScreen({ route }) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const { messageStore } = useStores()
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
      fetchMessages()
    }, [])

    const fetchMessages = () => {
      messageStore.getMessages(route.params.roomId)
    }

    const sendMessage = async () => {
      if (!name || name.length < 1 || !message || message.length < 1) {
        return
      }
      const msg = {
        name,
        message,
      }
      await messageStore.sendMessage(
        msg as Omit<Message, "roomId" | "id" | "createdAt">,
        route.params.roomId,
      )
    }

    return (
      <View style={Wrapper}>
        <Screen
          style={$root}
          preset="scroll"
          safeAreaEdges={["top"]}
          ScrollViewProps={{ stickyHeaderIndices: [0] }}
        >
          <Header title={route.params.roomName} safeAreaEdges={[]} />
          {messageStore.messages.map(({ name, message }, i) => (
            <ListItem key={`${name}-${i}`}>{message}</ListItem>
          ))}
        </Screen>
        <View style={InputWrapper}>
          <TextField
            placeholder="Enter your name"
            value={name}
            onChangeText={(value) => setName(value)}
          />
          <View style={MessageWrapper}>
            <TextField
              placeholder="Message"
              value={message}
              onChangeText={(value) => setMessage(value)}
              containerStyle={MessageFieldStyle}
            />
            <Button
              style={SendMessageButtonStyle}
              pressedStyle={SendMessageButtonPressedStyle}
              onPress={() => sendMessage()}
            >
              <MaterialIcons name="send" size={15} color="white" />
            </Button>
          </View>
        </View>
      </View>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
