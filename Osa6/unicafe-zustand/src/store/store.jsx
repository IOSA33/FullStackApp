import { create } from 'zustand'

const useStatisticsStore = create(set => ({
  stats: {
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  },

  actions: {
    goodInc: () => set(state => {
      const newGood = state.stats.good + 1
      const newAll = newGood + state.stats.neutral + state.stats.bad
      const newAverage = newAll === 0 ? 0 : (newGood - state.stats.bad) / newAll

      return {
        stats: {
          ...state.stats,
          good: newGood,
          all: newAll,
          average: newAverage,
          positive: newAll === 0 ? 0 : (newGood / newAll) * 100
        }
      }
    }),

    neutralInc: () => set(state => {
      const newNeutral = state.stats.neutral + 1
      const newAll = state.stats.good + newNeutral + state.stats.bad
      const newAverage = newAll === 0 ? 0 : (state.stats.good - state.stats.bad) / newAll

      return {
        stats: {
          ...state.stats,
          neutral: newNeutral,
          all: newAll,
          average: newAverage,
          positive: newAll === 0 ? 0 : (state.stats.good / newAll) * 100
        }
      }
    }),
    
    badInc: () => set(state => {
      const newBad = state.stats.bad + 1
      const newAll = state.stats.good + state.stats.neutral + newBad
      const newAverage = newAll === 0 ? 0 : (state.stats.good - newBad) / newAll

      return {
        stats: {
          ...state.stats,
          bad: newBad,
          all: newAll,
          average: newAverage,
          positive: newAll === 0 ? 0 : (state.stats.good / newAll) * 100
        }
      }
    }),
  }
}))

export const useStatistics = () => useStatisticsStore(state => state.stats)
export const useStatControls = () => useStatisticsStore(state => state.actions)