import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createOne: vi.fn(),
    update: vi.fn(),
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdotes123, useAnecdoteActions } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filterWord: '' })
  vi.clearAllMocks()
})

describe('useNoteActions', () => {
    it('initialize loads anecdotes from service', async () => {
        const mockNotes = [{ id: 1, content: 'Test', votes: 1 }]
        anecdoteService.getAll.mockResolvedValue(mockNotes)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
        await result.current.initialize()
        })

        const { result: notesResult } = renderHook(() => useAnecdotes())
        expect(notesResult.current).toEqual(mockNotes)
    })

    it('sorted by votes', async () => {
        const mockAnecdotes = [
            { id: 1, content: 'test1', votes: 1 },
            { id: 2, content: 'test10', votes: 10 },
            { id: 3, content: 'test5', votes: 5 },
        ]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result: actionResult } = renderHook(() => useAnecdoteActions())
        await act(async () => {
            await actionResult.current.initialize()
        })

        const { result: notesResult } = renderHook(() => useAnecdotes())

        expect(notesResult.current).toEqual([
            { id: 2, content: 'test10', votes: 10 },
            { id: 3, content: 'test5', votes: 5 },
            { id: 1, content: 'test1', votes: 1 },
        ])
    })

    it.only('returned correct anecdotes', async () => {
        const mockAnecdotes = [
            { id: 1, content: 'test1', votes: 1 },
            { id: 2, content: 'test10', votes: 10 },
            { id: 3, content: 'test5', votes: 5 },
        ]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result: actionResult } = renderHook(() => useAnecdoteActions())
        await act(async () => {
            await actionResult.current.initialize()
            actionResult.current.setFilterWord('test5')
        })

        const { result: notesResult } = renderHook(() => useAnecdotes123())

        expect(notesResult.current).toEqual([
            { id: 3, content: 'test5', votes: 5 }
        ])
    })

    it('toggleImportance flips important flag', async () => {
        const note = { id: 1, content: 'Test', important: false }
        useNoteStore.setState({ notes: [note] })
        noteService.update.mockResolvedValue({ ...note, important: true })

        const { result } = renderHook(() => useNoteActions())

        await act(async () => {
        await result.current.toggleImportance(1)
        })

        const { result: notesResult } = renderHook(() => useNotes())
        expect(notesResult.current[0].important).toBe(true)
    })
})