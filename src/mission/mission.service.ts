import {Injectable, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put } from '@nestjs/common';
import { IMission } from './mission.interface';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class MissionService {
    private readonly filePath = path.join(process.cwd(), 'data', 'missions.json');
    private readonly missions = [
    { id: 1, codename: 'OPERATION_STORM', status: 'ACTIVE' },
    { id: 2, codename: 'SILENT_SNAKE', status: 'COMPLETED' },
    { id: 3, codename: 'RED_DAWN', status: 'FAILED' },
    { id: 4, codename: 'BLACKOUT', status: 'ACTIVE' },
    { id: 5, codename: 'ECHO_FALLS', status: 'COMPLETED' },
    { id: 6, codename: 'GHOST_RIDER', status: 'COMPLETED' }
  ];
    async getSummary(){
        function countStatus(status: string) {
            return this.missions.filter(mission => mission.status === status).length;
        }
        return {
            ACTIVE: countStatus('ACTIVE'),
            COMPLETED: countStatus('COMPLETED'),
            FAILED: countStatus('FAILED')
        };
    }
  findAll(): IMission[] {
    const rawData = fs.readFileSync(this.filePath, 'utf-8');
    const missions: IMission[] = JSON.parse(rawData);
    return missions.map((mission) => {
      let durationDays = -1;

      if (mission.endDate) {
        const start = new Date(mission.startDate!);
        const end = new Date(mission.endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }

      return {
        ...mission,
        durationDays,
      };
    });
  }
    }