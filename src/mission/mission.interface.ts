import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

export interface IMission {
    id: number;
    codename: string;
    status: 'ACTIVE' | 'COMPLETED' | 'FAILED';
    targetname?: string;
    risklevel?: 'LOW' | 'MEDIUM' | 'HIGH';
    startDate?: Date;
    endDate?: Date;
}