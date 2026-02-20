'use client';

import React from 'react';
import TeamRolesView from '@/components/team-roles/TeamRolesView';

export default function TeamRolesPage() {
    return (
        <div className="flex flex-col items-start w-full max-w-[83.33vw] px-[2.08vw] py-[2.08vw]">
            <TeamRolesView />
        </div>
    );
}
