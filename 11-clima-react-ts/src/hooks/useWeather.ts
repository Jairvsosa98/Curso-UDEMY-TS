import axios from 'axios'
import { z } from 'zod'
// import { object, string, number, InferOutput, parse } from 'valibot'
import type { SearchType } from '../types'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'

// TYPE GUARD O ASSERTION
// function isWeatherResponse(weather: unknown): weather is WeatherResponse {
//     return (
//         Boolean(weather) &&
//         typeof weather === 'object' &&
//         typeof (weather as WeatherResponse).name === 'string' &&
//         typeof (weather as WeatherResponse).main.temp === 'number' &&
//         typeof (weather as WeatherResponse).main.temp_max === 'number' &&
//         typeof (weather as WeatherResponse).main.temp_min === 'number' &&
//     )
// }

// Zod
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})

export type Weather = z.infer<typeof Weather>

// Valibot
// const WeatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_max: number(),
//         temp_min: number(),

//     })
// })

// type Weather = InferOutput<typeof WeatherSchema>

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0,
    }
}

export default function useWeather() {
    const [weather, setWeather] = useState<Weather>(initialState)
    const [loading, setLoading] = useState(false)
    const fetchWeather = async (search: SearchType) => {
        setLoading(true)
        setWeather(initialState)
        try {
            const apiKey = import.meta.env.VITE_API_WEATHER_KEY

            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`

            const { data } = await axios(geoUrl)
            if (!data[0]) toast.warning('Clima no encontrado');

            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

            // const { data: weather } = await axios<WeatherResponse>(weatherUrl)
            // console.log(weather.temp)
            // console.log(weather.name)

            // Type Guards
            // const { data: weather } = await axios(weatherUrl)
            // const result = isWeatherResponse(weather)
            // if (result) {
            //     console.log(weather.name)
            // } else {
            //     console.log('Respuesta mal formada')
            // }

            // Valibot
            // const { data: weather } = await axios(weatherUrl)
            // const result = parse(WeatherSchema, weather)

            // if (result) {
            //     console.log(result.name)
            // } else {
            //     console.log('Respuesta mal formada')

            // }

            // Zod
            const { data: weather } = await axios(weatherUrl)
            const result = Weather.safeParse(weather)
            if (result.success) {
                setWeather(result.data)
            }

        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }

    }


    const hasWeatherData = useMemo(() => weather.name, [weather])
    return {
        weather,
        loading,
        fetchWeather,
        hasWeatherData
    }
}