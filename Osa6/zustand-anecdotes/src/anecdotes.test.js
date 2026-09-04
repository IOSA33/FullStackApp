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
import anecdotes from './services/anecdotes'

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

    it('returned correct anecdotes', async () => {
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

    it('like increases the votes amount', async () => {
        const note = { id: 1, content: 'Test', votes: 1 }
        useAnecdoteStore.setState({ anecdotes: [note] })
        anecdoteService.update.mockResolvedValue({ ...note, votes: 2 })

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.like(1)
        })

        const { result: notesResult } = renderHook(() => useAnecdotes())
        expect(notesResult.current[0].votes).toBe(2)
    })
})