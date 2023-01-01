import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Button, Header, ListItem, Screen, TextField } from "../components"
import { Message, useStores } from "../models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

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
        <TextField
          placeholder="Enter your name"
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <TextField
          placeholder="Message"
          value={message}
          onChangeText={(value) => setMessage(value)}
        />
        <Button onPress={() => sendMessage()}>Send</Button>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
