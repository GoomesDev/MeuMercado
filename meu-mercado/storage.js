import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@shopping_lists'

export const saveLists = async (lists) => {
  try {
    const jsonValue = JSON.stringify(lists)
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
  } catch (e) {
    console.error('Error saving lists: ', e)
  }
}

export const getLists = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
    return jsonValue != null ? JSON.parse(jsonValue) : []
  } catch (e) {
    console.error('Error fetching lists: ', e)
  }
}

export const removeList = async (id) => {
  try {
    const lists = await getLists()
    const updatedLists = lists.filter(list => list.id !== id)
    await saveLists(updatedLists)
  } catch (e) {
    console.error('Error removing list: ', e)
  }
}

export const clearLists = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      console.error('Error clearing lists: ', e)
    }
  }
