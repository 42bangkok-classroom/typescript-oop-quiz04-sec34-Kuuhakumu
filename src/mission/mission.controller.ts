import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MissionService } from './mission.service';
@Controller()
export class MissionController {
    constructor(private readonly missionService: MissionService) {}
    }
