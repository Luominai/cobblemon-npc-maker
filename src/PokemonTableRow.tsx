import { TableRow, TableCell, Typography } from "@mui/material"
import settings from "./settings.json"
import Pokemon from "./types/Pokemon"
import { CellStyle, TypographyStyle } from "./styles/PokemonTableStyles"
import Ability from "./types/Ability"
import abilitiesJSON from "./data/abilities.json"
import { Fragment } from "react/jsx-runtime"
import presetMap from "./PresetMap"

const listOfAbilities = abilitiesJSON as Record<string, Ability>

const statsMap: {[key: string]: string} = {
    "hp": "Hp",
    "attack": "Atk",
    "defence": "Def",
    "special_attack": "SpA",
    "special_defence": "SpD",
    "speed": "Spe"
}
    

export default function PokemonTableRow({pokemon}: {pokemon: Pokemon}) {
    // console.log(pokemon)
    return (
        <Fragment>
            <TableRow>
                {/* name */}
                <TableCell sx={CellStyle}>
                    <Typography fontSize={settings.smallFont} sx={TypographyStyle} height={"50px"} width={"120px"}>
                        <div style={{margin: "auto"}}>
                            <img src={pokemon.minisprite} style={{verticalAlign: "middle"}}/>
                        </div>
                        <div style={{margin: "auto"}}>
                            {pokemon.name}
                        </div>
                    </Typography>
                </TableCell>

                {/* typing */}
                <TableCell sx={CellStyle}>
                    <Typography fontSize={settings.smallFont} sx={TypographyStyle} width={"60px"}>
                        <div style={{margin: "auto"}}>
                            {pokemon.typing.primaryType}
                        </div>
                        {(pokemon.typing.secondaryType != "") 
                        ? 
                            <div style={{margin: "auto"}}>
                                {pokemon.typing.secondaryType}
                            </div>
                        :
                            ""
                        }
                    </Typography>
                </TableCell>

                {/* abilities */}
                <TableCell sx={CellStyle}>
                    <Typography fontSize={settings.smallFont} sx={TypographyStyle} width={"100px"}>
                        <div style={{margin: "auto"}}>
                            {listOfAbilities[pokemon.abilities.primaryAbility].name}
                        </div>
                        
                        {(pokemon.abilities.secondaryAbility !=  "") 
                        ? 
                            <div style={{margin: "auto"}}>
                                {listOfAbilities[pokemon.abilities.secondaryAbility].name}
                            </div>
                        : 
                            ""
                        }
                    </Typography>
                </TableCell>

                {/* hidden ability */}
                <TableCell sx={CellStyle}>
                    <Typography fontSize={settings.smallFont} sx={TypographyStyle} width={"100px"}>
                        {(pokemon.abilities.hiddenAbility !=  "") 
                        ?
                            <div style={{margin: "auto"}}>
                                {listOfAbilities[pokemon.abilities.hiddenAbility].name}
                            </div>
                        : 
                            ""
                        }
                    </Typography>
                </TableCell>
                
                {/* stats */}
                {Object.entries(pokemon.baseStats).map(([stat, value]) => {
                    return (
                        <Fragment key={statsMap[stat]}>
                            <TableCell sx={CellStyle} width={"25px"}>
                                <Typography fontSize={10} color={"lightgray"}>{statsMap[stat]}</Typography>
                                <Typography fontSize={settings.smallFont}>{value}</Typography>
                            </TableCell>
                        </Fragment>
                    )
                })}

                {/* presets */}
                <TableCell sx={CellStyle}>
                    <Typography fontSize={settings.smallFont} sx={TypographyStyle}>
                        {(pokemon.presets.length > 0) 
                        ?
                            <div style={{margin: "auto"}}>
                                {pokemon.presets.map((preset) => {
                                    return (
                                        <>
                                        <img src={presetMap[preset]} style={{width:"24px", height:"24px"}} title={preset}/>
                                        </>
                                    )
                                })}
                            </div>
                        : 
                            ""
                        }
                    </Typography>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}