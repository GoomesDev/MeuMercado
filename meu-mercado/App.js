import React, { useState, useEffect } from 'react'
import { Text, View, Button, FlatList, TouchableOpacity } from 'react-native'
import { saveLists, getLists, removeList, clearLists } from './storage'
import { styles } from './styled'

export default function App() {
  const [lists, setLists] = useState([])

  useEffect(() => {
    const fetchLists = async () => {
      const storedLists = await getLists()
      setLists(storedLists)
    }

    fetchLists()
  }, [])

  const addList = () => {
    const newList = {
      id: (lists.length + 1).toString(),
      name: `New List ${lists.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      items: []
    }

    const updatedLists = [...lists, newList]
    setLists(updatedLists)
    saveLists(updatedLists)
  }

  const deleteList = async (id) => {
    await removeList(id)
    const updatedLists = lists.filter(list => list.id !== id)
    setLists(updatedLists)
  }

  const clearAllLists = async () => {
    await clearLists()
    setLists([])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shopping List App</Text>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.text}>{item.name}</Text>
            <TouchableOpacity onPress={() => deleteList(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Add List" onPress={addList} />
      <Button title="Clear All Lists" onPress={clearAllLists} />
    </View>
  )
}
