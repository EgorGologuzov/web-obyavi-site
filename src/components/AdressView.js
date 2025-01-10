import React from 'react'

export default function AdressView({ adress }) {
    return adress && adress.city && adress.district && 
        (<span level={2}>{`г. ${adress.city}, ${adress.district}` }</span>)
}
