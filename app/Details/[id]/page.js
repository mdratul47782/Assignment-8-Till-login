import MovieDetails from '@/components/movieDetails/MovieDetails'
import React from 'react'

function DetailsPage( {params:{id}}) {
  return (
    <div>
        <MovieDetails id ={id}/>
    </div>
  )
}

export default DetailsPage