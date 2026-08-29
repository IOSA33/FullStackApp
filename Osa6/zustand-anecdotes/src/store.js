
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useNotificationStore = create((set) => ({
  notification_text: "",
  actions: {
    set_text: text => set( state => ({
      notification_text: text
    })),
    showNotification: (text, seconds = 5) => {
      set({ notification_text: text })
      setTimeout(() => {
        set({ notification_text: "" })
      }, seconds * 1000)
    }
  },
}))

const useAnecdoteStore = create((set, get) => ({
  filterWord: "",
  anecdotes: [],
  actions: {
    like: async (id) => {
      const anecdote = get().anecdotes.find(n => n.id === id)
      const updated = await anecdoteService.update(id, { ...anecdote, votes: anecdote.votes + 1 })
      set( state => ({
        anecdotes: state.anecdotes.map(anecdote => anecdote.id === id ? updated : anecdote)
      }))
    },

    add: async content => {
      const newAnecdote = await anecdoteService.createOne(content)
      set( state => ({
        anecdotes: state.anecdotes.concat(newAnecdote)
      }))
    },

    deleteAction: async (id, votes) => {
      const responseStatus = await anecdoteService.deleteOne(id, votes)
      set( state => ({
        anecdotes: state.anecdotes.filter(n => n.id !== id)
      }))
    },

    setFilterWord: filter => set( state => ({
      filterWord: filter
    })),

    initialize: async () => { 
      const anecdotes = await anecdoteService.getAll()
      set(() => ({anecdotes}))
    }
  },
}))

export const useAnecdotes123 = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filterWord = useAnecdoteStore(state => state.filterWord)
  if (filterWord === "") return anecdotes
  const filtered = anecdotes.filter(anecdote => anecdote.content.includes(filterWord))
  return filtered
}

export const useNotificationText = () => useNotificationStore((state) => state.notification_text)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
