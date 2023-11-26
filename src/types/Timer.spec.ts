import { describe, expect, test } from 'vitest'
import { toTime, toTimeString } from "./Timer";

describe('timer', () => {
    test('returns expected hour', () => {
        expect(toTime(3600)).toMatchObject({
            hours: 1,
            minutes: 0,
            seconds: 0
        })
    }),

    test('returns default format', () => {
        expect(toTimeString(180)).toBe("3:00")
    }),

    test('returns custom format', () => {
        expect(toTimeString(3661, "hh:m:s")).toBe("01:1:1")
    }),

    test('returns ignored tokens', () => {
        expect(toTimeString(3600, "mm:M:h")).toBe('00:M:1')
    })
})