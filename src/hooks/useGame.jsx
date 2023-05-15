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
                flippedCards: !state.playerState.flippedCards.includes(index) ? [...state.playerState.flippedCards, index] : state.playerState.flippedCards
            }
        })),

    }
})