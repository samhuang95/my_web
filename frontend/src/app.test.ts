import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';

import App from './App.vue';
import Quasar from 'quasar';
import i18n from './locales/i18n';
installQuasarPlugin();

describe('App 入口組件', () => {
  describe('測試基本內容', () => {
    it('是否包含 codfish 文字', () => {
      const wrapper = mount(App, {
        global: {
          plugins: [
            createTestingPinia({
              createSpy: vi.fn,
            }),
            Quasar,
            i18n,
          ],
        },
      });

      expect(wrapper.text()).toContain('codfish');
    });
  });
});
