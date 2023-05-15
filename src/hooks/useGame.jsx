import create from 'zustand'

import { boardPositionsArray } from '../data/boardPositions'

export const useGame = create((set) => {

    return {
        playerState: {
            playerStep: 0,
            previousRoll: 0,
            activeCard: null,
            flippedCards: [],
        },
        
        updatePlayerRoll: (roll) => {
            set(state => ({
                playerState: {
                    ...state.playerState,
                    playerStep: state.playerState.playerStep + roll >  boardPositionsArray.length - 1 ? boardPositionsArray.length - 1 : state.playerState.playerStep + roll,
                    previousRoll: roll
                }
            }))
        },

        setActiveCard: (index) => set(state => ({
            playerState: {
                ...state.playerState,
                activeCard: index
            }
        })),

        setFlippedCards: (index) => set(state => ({
            playerState: {
                ...state.playerState,
                flippedCards: [...state.playerState.flippedCards, index]
            }
        })),



        // playerStep: 0,
        // previousRoll: 0,
        // updatePlayerRoll: (roll) => set(state => ({ 
        //     playerStep: state.playerStep + roll, 
        //     previousRoll: roll 
        // })),

        // activeCard: null,
        // setActiveCard: (index) => set({ activeCard: index }),

        // flippedCards: [],
        // setFlippedCards: (index) => set(state => ({ flippedCards: [...state.flippedCards, index] })),

    }
})