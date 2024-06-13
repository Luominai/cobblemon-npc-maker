import { TextField } from "@mui/material";
import Pokemon from "./types/Pokemon";
import { Fragment, useEffect, useState } from "react";
import memoized_pokemon_json from "./data/memoized_pokemon.json"
import implemented_pokemon_json from "./data/pokemon_implemented.json"

const memoized_pokemon: Record<string, Array<string>> = memoized_pokemon_json
const implemented_pokemon: Record<string, Pokemon> = implemented_pokemon_json
const listOfPokemon: Array<Pokemon> = Object.values(implemented_pokemon)

function partsContain(string: string, substring: string) {
    const parts = string.split(" ")
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i].toLowerCase().replace(/[^a-z0-9]/gi, '')
        const substringToSearchFor = substring.toLowerCase().replace(/[^a-z0-9]/gi, '')

        if (part.startsWith(substringToSearchFor)) {
            return true
        }
    }
    return false
}

function applyNameFilter(name: string, dictOfPokemon: Record<string, Pokemon>) {
    // if no name given, do nothing
    if (name.trim() == "") {
        return dictOfPokemon
    }

    // first, get the first character of the input string and return the list of pokemon memoized under that letter
    const firstLetter = name.toLowerCase().replace(/[^a-z0-9]/gi, '').substring(0,1)
    const firstPass = memoized_pokemon[firstLetter]

    // now filter using the rest of the input substring
    // const input = name.toLowerCase().replace(/[^a-z0-9]/gi, '')
    // const secondPass = firstPass.filter((pokemonName) => {
    //     const parts = pokemonName.split(" ")
    //     for (let i = 0; i < parts.length; i++) {
    //         const part = parts[i].toLowerCase().replace(/[^a-z0-9]/gi, '')
    //         if (part.startsWith(input)) {
    //             return true
    //         }
    //     }
    //     return false
    // })

    // now filter using the rest of the input substring
    const secondPass = firstPass.filter((pokemonName) => {
        return partsContain(pokemonName, name)
    })

    let matchingPokemon: Record<string, Pokemon> = {}
    for(let i = 0; i < secondPass.length; i++) {
        // convert the name to the corresponding key in implemented_pokemon
        const key = secondPass[i].toLowerCase().replace(/[^a-z0-9]/gi, '')
        // keep only the pokemon if they are in the pokemonDict passed into this function
        if (dictOfPokemon[key]) {
            matchingPokemon[key] = (dictOfPokemon[key])
        }
    }
    console.log(matchingPokemon)

    return matchingPokemon
}

function applyTypeFilter(type: Array<string>, dictOfPokemon: Record<string, Pokemon>) {
    // if no filter given, do nothing
    if (type.length === 0) {
        return dictOfPokemon
    }

    let matchingPokemon: Record<string, Pokemon> = {}
    // check the typing of every pokemon in dict
    for (let [key, value] of Object.entries(dictOfPokemon)) {
        // if there are 2 input types, look for exact type matches
        if (type[0] && type[1]) {
            if (value.typing.primaryType == type[0] && value.typing.secondaryType == type[1] || 
                value.typing.primaryType == type[1] && value.typing.secondaryType == type[0]) {
                matchingPokemon[key] = value
            }
        }
        // if there is only 1 input type, look for all pokemon that include the type
        else if (type[0]) {
            if (value.typing.primaryType == type[0] || value.typing.secondaryType == type[0]) {
                matchingPokemon[key] = value
            }
        }
    }

    // console.log(matchingPokemon)
    return matchingPokemon
    
}

function applyAbilityFilter(ability: string, dictOfPokemon: Record<string, Pokemon>) {
    // if no name given, do nothing
    if (ability.trim() == "") {
        return dictOfPokemon
    }

    ability = ability.toLowerCase().replace(/[^a-z0-9]/gi, '')

    const firstPass = Object.fromEntries(Object.entries(dictOfPokemon).filter(([key, value]) => {
        return (
            ability == value.abilities?.primaryAbility || 
            ability == value.abilities?.secondaryAbility || 
            ability == value.abilities?.hiddenAbility
        )
    }))

    return firstPass
}



export {applyNameFilter, applyTypeFilter, applyAbilityFilter}