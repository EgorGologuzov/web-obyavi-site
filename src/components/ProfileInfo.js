import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import Header from './Header'
import StarsBar from './StarsBar'
import "./css/ProfileInfo.css"
import { useNavigate } from 'react-router-dom'
import { useAdService } from '../data/AdService'
import { busyProcess } from '../utils/utils'
import Load from './Load'

export default function ProfileInfo({ clientId }) {
    const [client, setClient] = useState();
    const [isBusy, setIsBusy] = useState(false);
    const navigate = useNavigate();
    const adService = useAdService();

    useEffect(() => {
        if (clientId && clientId != client?.id) {
            busyProcess(isBusy, setIsBusy, () => adService.getOwner({ ownerId: clientId })
                .then((clientValue) => setClient(clientValue))
            )
        }
    }, [])

    return !isBusy && client && (
        <div className="profile-info" onClick={() => navigate("/c/client/" + client.id)}>
            <Avatar src={client.avatar} />
            <Header level={5}>{`${client.firstname} ${client.lastname}`}</Header>
            <StarsBar value={client.rating} />
        </div>
    ) || isBusy && <Load />
}
