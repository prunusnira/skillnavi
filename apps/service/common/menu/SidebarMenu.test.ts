import { describe, it, expect } from 'vitest';
import { SidebarMenuItems } from './SidebarMenu';

describe('SidebarMenuItems', () => {
    it('모든 최상위 항목은 고유 id를 가진다', () => {
        // Given
        const keys = Object.keys(SidebarMenuItems);

        // When
        const ids = keys.map((k) => SidebarMenuItems[k as keyof typeof SidebarMenuItems].id);

        // Then
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('최상위 항목은 iconSrc를 포함한다', () => {
        // Given
        const keys = Object.keys(SidebarMenuItems);

        // When / Then
        for (const k of keys) {
            expect(SidebarMenuItems[k as keyof typeof SidebarMenuItems].iconSrc).toBeTruthy();
        }
    });

    it('subMenu가 있는 항목은 모든 하위 메뉴가 id와 href를 가진다', () => {
        // Given
        const keys = Object.keys(SidebarMenuItems);

        // When / Then
        for (const k of keys) {
            const item = SidebarMenuItems[k as keyof typeof SidebarMenuItems];
            if (item.subMenu) {
                for (const sub of item.subMenu) {
                    expect(sub.id).toBeTruthy();
                    expect(sub.href).toBeTruthy();
                }
            }
        }
    });

    it('단일 메뉴 항목(home, tower)은 href를 가진다', () => {
        // Given / When / Then
        expect(SidebarMenuItems.home.href).toBeTruthy();
        expect(SidebarMenuItems.tower.href).toBeTruthy();
    });

    it('mydata/skill/pattern 항목은 subMenu를 가진다', () => {
        // Given / When / Then
        expect(SidebarMenuItems.mydata.subMenu?.length).toBeGreaterThan(0);
        expect(SidebarMenuItems.skill.subMenu?.length).toBeGreaterThan(0);
        expect(SidebarMenuItems.pattern.subMenu?.length).toBeGreaterThan(0);
    });
});
