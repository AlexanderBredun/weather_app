import {
    getPosition
} from './funcs'
import { describe, expect, test } from 'vitest'

import { vi } from 'vitest'
const mockGeolocation = {
  geolocation: {
    getCurrentPosition: vi.fn()
    .mockImplementationOnce((success) => Promise.resolve(success({
      coords: {
        latitude: 51.1,
        longitude: 45.3
      }
    })))
  }
  };
 vi.stubGlobal('navigator', mockGeolocation)

/**
 * @vitest-environment jsdom
 */

describe('getPosition', () => {
    test('should return lat and long', () => {
       
        return getPosition().then(data => {
            expect(data).toHaveProperty('coords');
            expect(data.coords).toHaveProperty('latitude');
            expect(data.coords).toHaveProperty('longitude');
          });
      })
})
