import { database } from '@/adapters/database';
import { ActionResponse } from '@/adapters/broker';

import { processSolarRoof } from '@/ports/solarRoof';

import { Client } from '@/domain/solarRoof/entities/client';
import { Point } from '@/domain/solarRoof/entities/point';

import ModelClient from '@/application/models/client';
import ModelPoint from '@/application/models/point';

type SettingsSolarRoof = {
    params: {
        cups: string
    }
}

export const actionSolarRoof = (settings: unknown): ActionResponse => {
    try {

        const s = settings as SettingsSolarRoof;
        const client = ModelClient.getClientByCUP(s.params.cups, database.repositories.clients as Client[]) as Client;
    
        if (!client) {
            return {
                result: '',
                status: 'not-found-cups'
            };        
        }
        
        const clientPoint = ModelPoint.getPointByCUP(s.params.cups, database.repositories.points as Point[]) as Point;
        const neighborPoints = ModelPoint.getNeighborPointsByCUP(clientPoint, database.repositories.points as Point[]) as Point[];
        const result = processSolarRoof(client, clientPoint, neighborPoints);
    
        return {
            result: result,
            status: result.status
        };

    } catch (e) {
        console.error(e);
        return {
            result: {},
            status: 'internal-error'
        };        
    }
};
