import create from 'zustand'

import { boardPositionsArray } from '../data/boardPositions'

export const useGame = create((set, get) => {

    const saveState = () => {
        const state = get()
        localStorage.setItem('playerState', JSON.stringify(state.playerState))
    }

    const resetState = () => {
        localStorage.removeItem('playerState')
        set({
            playerState: {
                playerStep: 0,
                previousRoll: 0,
                activeCard: null,
                flippedCards: [],
            }
        })
    }

    const loadedState = JSON.parse(localStorage.getItem('playerState')) || {
        playerStep: 0,
        previousRoll: 0,
        activeCard: null,
        flippedCards: [],
    }


    return {
        playerState: loadedState,
        
        updatePlayerRoll: (roll) => {
            set(state => ({
                playerState: {
                    ...state.playerState,
                    playerStep: state.playerState.playerStep + roll >  boardPositionsArray.length - 1 ? boardPositionsArray.length - 1 : state.playerState.playerStep + roll,
                    previousRoll: roll
                }
            }))
            saveState()
        },

        setActiveCard: (index) => {
            set(state => ({
                playerState: {
                    ...state.playerState,
                    activeCard: index
                }
            }))
            saveState()
        },

        setFlippedCards: (index) => {
            set(state => ({
                playerState: {
                    ...state.playerState,
                    flippedCards: !state.playerState.flippedCards.includes(index) ? [...state.playerState.flippedCards, index] : state.playerState.flippedCards
                }
            }))
            saveState()
        },

        resetState: resetState,

    }
})